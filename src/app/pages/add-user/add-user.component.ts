import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogTitle,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  private fb :FormBuilder = inject(FormBuilder);
  private userService :UserService = inject(UserService);
  private router:Router = inject(Router);
  private snackBar:MatSnackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.addUser(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('User added successfully 🎉', 'Close', { duration: 3000 });
          this.router.navigate(['/shell/home']);
        },
        error: (err) => {
          console.error('Add user failed', err);
          this.snackBar.open('Failed to add user 😢', 'Close', { duration: 3000 });
        },
      });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }
}
