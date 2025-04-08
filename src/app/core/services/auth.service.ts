import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {
  AuthFormValue,
  LoginSuccessResponse,
  RegisterErrorResponse,
  RegisterSuccessResponse
} from '../models/auth.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl: string = 'http://localhost:3000/';

  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)

  isLoggedIn: WritableSignal<boolean> = signal<boolean>(!!localStorage.getItem('token'));
  role:WritableSignal<string|null> = signal<string|null>(null);
  loggedInUser: WritableSignal<LoginSuccessResponse | null> = signal(null);

  setUserPermissionsFromLogin(user: LoginSuccessResponse): void {
    this.role.set(user.role);
    this.loggedInUser.set(user);

  }
  setLoggedIn(status: boolean):void {
    this.isLoggedIn.set(status);
  }

  login(payload: AuthFormValue): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'login', payload);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/shell/auth']).then((success: boolean): void => {
      if (success) {
        this.isLoggedIn.set(false);
      }
    });
  }

  register(payload: AuthFormValue): Observable<RegisterSuccessResponse | RegisterErrorResponse> {
    return this.http.post<RegisterSuccessResponse | RegisterErrorResponse>(this.baseUrl + 'register', payload);
  }

}
