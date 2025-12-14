import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserFilter } from '../../interfaces/UserFilter.interface';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFilterService {
  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterUsers(filterModel: UserFilter): Observable<ServiceResponse<UserFilter[]>> {
    return this.http.post<ServiceResponse<UserFilter[]>>(`${this.url}/UserFilter/filter-users`, filterModel);
  }
}
