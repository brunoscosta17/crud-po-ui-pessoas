import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly api = 'https://po-sample-api.onrender.com/v1/people';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getAllPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  beforeNew(): Observable<any> {
    return this.http.post<any>(`${this.api}/before-new`, {});
  }
}
