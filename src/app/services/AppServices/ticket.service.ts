import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  GetTicket(ticketNumber: string): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Ticket/get-ticket/${ticketNumber}`);
  }
}
