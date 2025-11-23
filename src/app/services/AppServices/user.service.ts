import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string = "http://localhost:5097/api"

  http: HttpClient = inject(HttpClient);

  GetUser(userId: number): Observable<any> {
    return this.http.get(`${this.url}/User/admin/get-user/${userId}`)
  }

}
