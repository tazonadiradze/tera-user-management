import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../core/services/auth.service';
import {ChangePasswordPayload} from '../../core/models/auth.model';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: 'change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedChangePasswordComponent implements OnInit {
  @Input() mode: 'changeLoggedInUserPassword' | 'changePasswordByAdmin' = 'changeLoggedInUserPassword';
  @Output() passwordChanged: EventEmitter<ChangePasswordPayload> = new EventEmitter<ChangePasswordPayload>();
  form!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.mode === 'changeLoggedInUserPassword') {
      const email: string = this.auth.loggedInUser()?.email ?? '';
      this.form.addControl('oldPassword', this.fb.control('', Validators.required));
      this.form.get('email')?.setValue(email);
      this.form.get('email')?.disable();
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const raw: ChangePasswordPayload = this.form.getRawValue();
    const email: string = this.mode === 'changeLoggedInUserPassword' ? this.auth.loggedInUser()?.email ?? '' : raw.email;

    const payload: ChangePasswordPayload = {
      email, oldPassword: raw.oldPassword, newPassword: raw.newPassword
    };

    this.passwordChanged.emit(payload);
  }
}
