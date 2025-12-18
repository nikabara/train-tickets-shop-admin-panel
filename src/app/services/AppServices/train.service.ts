import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';
import { Observable } from 'rxjs';
import { UpdateTrain } from '../../interfaces/UpdateTrain.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  RemoveTrain(trainId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.url}/Train/remove-train/${trainId}`);
  }

  GetTrain(trainId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Train/get-train/${trainId}`);
  }

  UpdateTrain(updatedTrain: UpdateTrain): Observable<ServiceResponse<boolean>> {
    return this.http.put<ServiceResponse<boolean>>(`${this.url}/Train/update-train`, updatedTrain);
  }

  AddTrain(addTrain: any): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.url}/Train/add-train`, addTrain);
  }
}
