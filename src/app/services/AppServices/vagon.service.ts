import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class VagonService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  RemoveVagon(vagonId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.url}/Vagon/delete-vagon/${vagonId}`);
  }

  GetVagon(vagonId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Vagon/get-vagon/${vagonId}`);
  }

  AddVagon(addVagonModel: any): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.url}/Vagon/add-vagon`, addVagonModel);
  }
}
