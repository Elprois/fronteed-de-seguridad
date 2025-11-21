import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'segcdmx_token';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (!username.trim() || password.trim().length < 4) {
      return false;
    }
    localStorage.setItem(this.tokenKey, 'fake-jwt-token');
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }
}
