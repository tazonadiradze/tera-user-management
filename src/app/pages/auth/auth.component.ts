import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthFormComponent} from '../../shared/auth-form/auth-form.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {AuthService} from '../../core/services/auth.service';
import {AuthFormValue, LoginSuccessResponse} from '../../core/models/auth.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [AuthFormComponent, MatTab, MatTabGroup],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router)

  onSignin(value: AuthFormValue): void {
    this.authService.login(value).subscribe((user: LoginSuccessResponse) => {
      // ✅ First: set user, token, role, etc.
      this.authService.setUserAfterLogin(user);

      // ✅ Then: navigate
      this.router.navigate(['/shell/home']);
    });
  }


  onSignUp(value: AuthFormValue):void {
    this.authService.register(value).subscribe()
  }

  ngOnInit(): void {
  }
}
