import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN, USER_DETAILS } from '../util/api';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = false;
  details?: any;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn = true;
      setTimeout(() => this.getDetails());
    }
  }

  login(request: any) {
    return this.http.post<any>(USER_LOGIN, request).pipe(
      tap(
        ({ token }) => {
          console.log('token', token);
          this.isLoggedIn = true;
          localStorage.setItem('token', token);
          this.getDetails();
        },
        (error) => {
          console.log(error);

          if (error.status == 422) {
            alert('Invalid request');
          } else {
            const message = error?.error?.error?.message;
            alert(message || 'something went wrong!');
          }
        }
      )
    );
  }

  private getDetails() {
    this.http.get(USER_DETAILS).subscribe((details) => {
      this.details = details;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.details = undefined;
    setTimeout(() => {
      location.reload();
    }, 300);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
