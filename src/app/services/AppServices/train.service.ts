import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  RemoveTrain(trainId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.url}/Train/remove-train/${trainId}`);
  }
}
