import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwIfEmpty } from 'rxjs';
import { ServiceResponse } from '../../interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly url: string = "http://localhost:5097/api"

  http: HttpClient = inject(HttpClient);

  GetTransactionsByUserId(userId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Transactions/get-user-transactions/${userId}`);
  }
}
