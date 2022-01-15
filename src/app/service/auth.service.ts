import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: string, password: string) {
    return this.http.post<Auth>(
      `${this.apiUrl}/login/ef8ee0b0-4bda-4a2e-89eb-94595bdce0b6`,{ user, password })
      .pipe(
      tap(response => this.tokenService.saveToken(response.jwt))
    );
  }

  refreshToken() {
    return this.http.get<Auth>(`${this.apiUrl}/refresh/ef8ee0b0-4bda-4a2e-89eb-94595bdce0b6`)
    .pipe(
      tap(response => this.tokenService.saveToken(response.jwt))
    );
  }

  logOut(){
    return this.http.get(`${this.apiUrl}/logout/ef8ee0b0-4bda-4a2e-89eb-94595bdce0b6`);
  }
}
