import {ChangeDetectionStrategy, Component, effect, EventEmitter, input, InputSignal, Output,} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AuthFormValue} from '../../core/models/auth.model';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, MatError, MatInput, MatFormField, MatButton, MatLabel, MatProgressSpinner,],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AuthFormComponent {
  mode: InputSignal<'signin' | 'signup'> = input.required<'signin' | 'signup'>();   // 'signin' | 'signup'
  loading: InputSignal<boolean> = input(false);                         // boolean

  @Output() submitForm :EventEmitter<AuthFormValue> = new EventEmitter<AuthFormValue>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm();

    effect((): void => {
      const currentMode: 'signin' | 'signup' = this.mode();
      if (currentMode === 'signup' && !this.form.contains('username')) {
        this.form.addControl('username', this.fb.control('', [Validators.required]));
      } else if (currentMode === 'signin' && this.form.contains('username')) {
        this.form.removeControl('username');
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
