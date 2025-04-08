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

  onSignin(value: AuthFormValue):void {
    this.authService.login(value).subscribe((loginResponse: LoginSuccessResponse) => {
      this.router.navigate(['/shell/home']).then((success: boolean): void => {
        if(success) {
          this.authService.saveToken(loginResponse.token)
          this.authService.setLoggedIn(true);
          this.authService.setUserPermissionsFromLogin(loginResponse);

        }
      });
    })
  }

  onSignUp(value: AuthFormValue):void {
    this.authService.register(value).subscribe()
  }

  ngOnInit(): void {
  }
}
