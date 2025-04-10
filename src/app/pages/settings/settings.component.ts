import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ChangePasswordPayload} from '../../core/models/auth.model';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedChangePasswordComponent} from '../../shared/change-password/change-password.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatSnackBarModule, SharedChangePasswordComponent,],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private authService: AuthService = inject(AuthService);
  readonly isAdmin: Signal<boolean> = computed((): boolean => this.authService.currentRole() === 'admin');
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  changeOwnPassword(payload: ChangePasswordPayload) {
    this.authService.changeOwnPassword(payload).subscribe({
      next: (response: { message: string }): void => {
        this.router.navigate(['/shell/home']).then((success: boolean): void => {
          if (success) {
            this.snackBar.open(response.message, 'Close', {duration: 3000});
          }
        });
      }, error: (): void => {
        this.snackBar.open('Failed to change password', 'Close', {duration: 3000});
      }
    });
  }

  changePasswordByAdmin(payload: ChangePasswordPayload): void {
    this.authService.changeUserPasswordByAdmin(payload).subscribe({
      next: (response: { message: string }): void => {
        this.router.navigate(['/shell/home']).then((success: boolean): void => {
          if (success) {
            this.snackBar.open(response.message, 'Close', {duration: 3000});
          }
        });
      }, error: (): void => {
        this.snackBar.open('Failed to change user password', 'Close', {duration: 3000});
      }
    });
  }

}
