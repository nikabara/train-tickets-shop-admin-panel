import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwaggerApiService {
  private http: HttpClient = inject(HttpClient);

  private apiURL = 'https://railway.stepprojects.ge/api';

  checkTicketStatus(ticketId: string) : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tickets/checkstatus/${ticketId}`)
  }

  confirmTicket(ticketId: string) : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tickets/confirm/${ticketId}`);
  }
  
  
}
