import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  MakeAdmin(userId: number): Observable<ServiceResponse<boolean>> {
    const jwtAccessToken = localStorage.getItem('jwt_access_token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtAccessToken}`);

    return this.http.put<ServiceResponse<boolean>>(`${this.url}/SuperAdmin/register-admin/${userId}`, {}, {headers: headers});
  }
}
