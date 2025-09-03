import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxRecord } from '../models/tax-record';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxRecordService {
  private baseUrl = `${environment.apiUrl}/api/taxrecords`;

  constructor(private http: HttpClient) { }

  getTaxRecords(): Observable<TaxRecord[]> {
    return this.http.get<TaxRecord[]>(this.baseUrl);
  }

  getTaxRecord(id: number): Observable<TaxRecord> {
    return this.http.get<TaxRecord>(`${this.baseUrl}/${id}`);
  }

  createTaxRecord(record: TaxRecord): Observable<TaxRecord> {
    return this.http.post<TaxRecord>(this.baseUrl, record);
  }

  updateTaxRecord(id: number, record: TaxRecord): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, record);
  }

  deleteTaxRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
