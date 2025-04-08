import {ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {User} from '../../../../core/models/user.model';
import {MatDivider} from '@angular/material/divider';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDivider, MatDialogTitle, MatSelect, MatOption]
})
export class EditUserDialogComponent implements OnInit {
  user: User = inject<User>(MAT_DIALOG_DATA);
  form!: FormGroup;
  private authService: AuthService = inject(AuthService);
  readonly isAdmin: Signal<boolean> = computed((): boolean => this.authService.role() === 'admin');
  private dialogRef: MatDialogRef<EditUserDialogComponent> = inject(MatDialogRef<EditUserDialogComponent>);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      role: [
        { value: this.user.role, disabled: !this.isAdmin() },
        Validators.required
      ]
    });
  }

  save(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      const updatedUser: User = this.isAdmin() ? {...this.user, ...formValue} // admin: merge all fields
        : {
          ...this.user, username: formValue.username, email: formValue.email, password: formValue.password
        };

      this.dialogRef.close(updatedUser);
    } else {
      this.form.markAllAsTouched();
    }
  }


  close(): void {
    this.dialogRef.close();
  }
}
