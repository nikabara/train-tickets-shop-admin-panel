// railwaytickets-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RailwayticketsApiService { // testing at log-in component

  // 1. Remove the incorrect class field injection:
  // private http = Inject(HttpClient); <--- REMOVE THIS LINE

  private apiURL = "http://localhost:5097/api"

  // 2. Add a constructor to inject HttpClient:
  constructor(private http: HttpClient) { } // <--- ADD THIS CONSTRUCTOR

  getTrain(trainId: number) : Observable<any> {
    // FIX the URL structure: Use template literals correctly
    return this.http.get(`${this.apiURL}/Train/get-train/${trainId}`);
  }
}
