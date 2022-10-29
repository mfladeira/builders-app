import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string) {
    return email === "mateusnewbuilder@email.com" && password === 'newbuilder';
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  loggout() {
    return localStorage.removeItem('token');
  }
}
