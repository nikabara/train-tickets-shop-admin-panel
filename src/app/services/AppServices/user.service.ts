import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string = "http://localhost:5097/api"

  http: HttpClient = inject(HttpClient);

  GetUser(userId: number): Observable<any> {
    const jwtAccessToken = localStorage.getItem('jwt_access_token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtAccessToken}`);

    return this.http.get(`${this.url}/User/admin/get-user/${userId}`, {headers: headers});
  }

}
