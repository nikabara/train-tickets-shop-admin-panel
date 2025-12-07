import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainFilter } from '../../interfaces/TrainFilter.interface';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainFilterService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterTrains(filterModel: TrainFilter): Observable<ServiceResponse<TrainFilter[]>> {
    return this.http.post<ServiceResponse<TrainFilter[]>>(`${this.url}/TrainsSchedulesFilter/filter-trains-and-schedules`, filterModel);
  }
}
