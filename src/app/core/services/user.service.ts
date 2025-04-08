import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:3000/';

  http: HttpClient = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users')
  }

  getUserDetailsById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}users/${id}`);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users', user);
  }


}
