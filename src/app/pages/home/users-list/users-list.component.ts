import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {User} from '../../../core/models/user.model';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';
import {EditUserDialogComponent} from './edit-user-dialog/edit-user-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../core/services/auth.service';
import {MatTooltip} from '@angular/material/tooltip';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, MatSortModule, MatIcon, MatIconButton, MatTooltip, NgClass],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);

  router: Router = inject(Router)
  dialog: MatDialog = inject(MatDialog)
  private snackBar:MatSnackBar = inject(MatSnackBar);

  users: WritableSignal<User[]> = signal([])
  readonly isAdmin:Signal<boolean> = computed(():boolean => this.authService.currentRole()==='admin');
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: WritableSignal<string[]> = signal(['id', 'username', 'email', 'role', 'actions']);
  readonly loggedInUser = computed(() => this.authService.loggedInUser?.());

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => this.users.set(users),
      error: () => this.snackBar.open('Failed to load user list', 'Close', { duration: 3000 })
    });
  }
  editUser(user: User): void {
    const dialogRef: MatDialogRef<EditUserDialogComponent> = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user,
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: User | undefined): void => {
      if (!result) return;

      this.userService.updateUser(result).subscribe({
        next: ():void => {
          this.users.update(users =>
            users.map(u => (u.id === result.id ? result : u))
          );
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        },
        error: ():void => {
          this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
        }
      });
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(users => users.filter(u => u.id !== id));
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
      }
    });
  }


  viewUserDetails(user: User): void {
    this.router.navigate(['shell/user-details', user.id]).then(success => {
      if (success) {
        this.snackBar.open(`Navigated to ${user.username}'s profile 👤`, 'Close', { duration: 3000 });
      } else {
        this.snackBar.open(`Failed to navigate to ${user.username}'s profile`, 'Close', { duration: 3000 });
      }
    });
  }

  getDeleteTooltip(user: User): string {
    if (!this.isAdmin()) return 'Only admins can delete users';
    if (user.email === this.authService.loggedInUser()?.email) return 'You cannot delete yourself';
    return 'Delete user';
  }

}



