import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {
  AuthFormValue, ChangePasswordPayload,
  LoginSuccessResponse,
  RegisterErrorResponse,
  RegisterSuccessResponse
} from '../models/auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly baseUrl: string = 'http://localhost:3000/';
  readonly token: WritableSignal<string> = signal('');
  readonly isLoggedIn: WritableSignal<boolean> = signal(!!localStorage.getItem('token'));
  readonly currentRole: WritableSignal<string | null> = signal(null);
  readonly loggedInUser: WritableSignal<LoginSuccessResponse | null> = signal(null);
  private readonly http :HttpClient = inject(HttpClient);
  private readonly router :Router = inject(Router);

  restoreUserSession(): void {
    const token: string | null = localStorage.getItem('token');
    const userRaw: string | null = localStorage.getItem('user');

    if (token && userRaw) {
      this.token.set(token);

      const parsedUser: LoginSuccessResponse = JSON.parse(userRaw);
      this.loggedInUser.set(parsedUser);
      this.currentRole.set(parsedUser.role);
    }
  }


  login(payload: AuthFormValue): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'login', payload);
  }

  register(payload: AuthFormValue): Observable<RegisterSuccessResponse | RegisterErrorResponse> {
    return this.http.post<RegisterSuccessResponse | RegisterErrorResponse>(this.baseUrl + 'register', payload);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.token.set('');
    this.loggedInUser.set(null);
    this.currentRole.set(null);
    this.isLoggedIn.set(false);

    this.router.navigate(['/shell/auth']);
  }

  setUserAfterLogin(user: LoginSuccessResponse): void {
    this.token.set(user.token);
    this.loggedInUser.set(user);
    this.currentRole.set(user.role);
    this.isLoggedIn.set(true);

    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  changeOwnPassword(payload: ChangePasswordPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl + 'changePassword', payload
    );
  }

  changeUserPasswordByAdmin(payload: ChangePasswordPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.baseUrl + 'admin-changePassword',
      payload
    );
  }
}
