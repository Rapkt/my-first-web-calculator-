import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalcResponse {
  result: number;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'https://my-first-web-calculator-backend.onrender.com/api/calculator/result';

  constructor(private http: HttpClient) {}

  calculate(expr: string): Observable<string> {
    console.log(expr);
    return this.http.get(`${this.apiUrl}?expr=${encodeURIComponent(expr)}`,
      {responseType:'text'});
  }
}
