import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:5097/api"

  constructor(private http: HttpClient) { }


  LogIn(email: string, password: string): Observable<any> {

    let params = new HttpParams().set("email", email).set("password", password);

    return this.http.post(`${this.apiURL}/Auth/log-in`, null, {params: params});

  }

  SendVerificationCode(userId: number): Observable<any> {
    return this.http.post(`${this.apiURL}/Auth/send-verification-code/${userId}`, null);
  }
}
