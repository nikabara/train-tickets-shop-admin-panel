import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';
import { GetTrainSchedule } from '../../interfaces/ISchedule/GetTrainSchedule.interface';
import { UpdateTrainSchedule } from '../../interfaces/ISchedule/UpdateTrainSchedule.interface';
import { AddTrainSchedule } from '../../interfaces/ISchedule/AddTrainSchedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  RemoveSchedule(scheduleId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.url}/TrainSchedule/remove-train-schedule/${scheduleId}`);
  }

  GetSchedule(scheduleId: number): Observable<ServiceResponse<GetTrainSchedule>> {
    return this.http.get<ServiceResponse<GetTrainSchedule>>(`${this.url}/TrainSchedule/get-train-schedule/${scheduleId}`);
  }

  EditSchedule(schedule: UpdateTrainSchedule): Observable<ServiceResponse<boolean>> {
    return this.http.put<ServiceResponse<boolean>>(`${this.url}/TrainSchedule/update-train-schedule`, schedule);
  }

  AddSchedule(schedule: AddTrainSchedule): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.url}/TrainSchedule/add-train-schedule`, schedule);
  }
}
