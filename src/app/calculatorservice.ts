import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalcResponse {
  result: number;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'http://localhost:8080/api/calculator/result';

  constructor(private http: HttpClient) {}

  calculate(expr: string): Observable<string> {
    console.log(expr);
    return this.http.get(`${this.apiUrl}?expr=${encodeURIComponent(expr)}`,
      {responseType:'text'});
  }
}
