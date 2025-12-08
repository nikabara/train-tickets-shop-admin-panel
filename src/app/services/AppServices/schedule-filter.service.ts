import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleFilter } from '../../interfaces/ScheduleFilter.interface';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFilterService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterSchedules(filterModel: ScheduleFilter): Observable<ServiceResponse<ScheduleFilter[]>> {
    return this.http.post<ServiceResponse<ScheduleFilter[]>>(`${this.url}/ScheduleFilter/filter-schedules`, filterModel);
  }
}
