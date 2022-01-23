import { Login } from './models/login';
import { Usuario } from './models/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API: string = environment.API + 'usuarios';
  readonly tokenURL: string = environment.obterTokenUrl;
  readonly clientID: string = environment.clientID;
  readonly clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken() {
    const tokenSting = localStorage.getItem('access_token');
    if (tokenSting) {
      const token = JSON.parse(tokenSting).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  guardar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.API, usuario);
  }

  getAllUser(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  tentarLogar(login: Login): Observable<any> {
    const params = new HttpParams()
      .set('username', login.username)
      .set('password', login.password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), { headers })
  }

  getUser() {
    const token = this.obterToken();
    if (token) {
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }

    return null;
  }

  logout() {
    localStorage.removeItem('access_token');

  }
}
