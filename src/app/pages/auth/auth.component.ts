import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {AuthFormComponent} from '../../shared/auth-form/auth-form.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {AuthService} from '../../core/services/auth.service';
import {AuthFormValue, LoginSuccessResponse} from '../../core/models/auth.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [AuthFormComponent, MatTab, MatTabGroup],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthComponent {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router)
  snackBar: MatSnackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  onSignin(value: AuthFormValue): void {
    this.authService.login(value).subscribe({
      next: (user: LoginSuccessResponse):void => {
        this.authService.setUserAfterLogin(user);
        this.router.navigate(['/shell/home']).then(success => {
          if (success) {
            this.snackBar.open(`Welcome back, ${user.username || 'user'}! 🎉`, 'Close', { duration: 3000 });
          } else {
            this.snackBar.open(`Failed to navigate to sign in`, 'Close', { duration: 3000 });
          }
        });
      },
      error: (err):void => {
        console.error('Login failed', err);
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 3000 });
      }
    });
  }

  onSignUp(value: AuthFormValue): void {
    this.authService.register(value).subscribe({
      next: ():void => {
        this.tabGroup.selectedIndex = 0;
        this.cdr.markForCheck();
        this.snackBar.open('Account created! You can now log in 🎉', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

}
