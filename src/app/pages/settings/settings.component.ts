import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordPayload } from '../../core/models/auth.model';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedChangePasswordComponent } from '../../shared/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatSnackBarModule,
    SharedChangePasswordComponent,
    MatTooltip
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  readonly isAdmin:Signal<boolean> = computed(():boolean => this.authService.currentRole()==='admin');

  changeOwnPassword(payload: ChangePasswordPayload) {
    this.authService.changeOwnPassword(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to change password', 'Close', { duration: 3000 });
      }
    });
  }

  changePasswordByAdmin(payload: ChangePasswordPayload) {
    this.authService.changeUserPasswordByAdmin(payload).subscribe({
      next: () => {
        this.snackBar.open(`Password changed for ${payload.email}`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to change user password', 'Close', { duration: 3000 });
      }
    });
  }

}
