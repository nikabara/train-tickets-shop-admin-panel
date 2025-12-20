import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class VagonFilterService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterVagons(vagonFilterModel: any): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(`${this.url}/VagonFilter/filter-vagons`, vagonFilterModel);
  }
}
