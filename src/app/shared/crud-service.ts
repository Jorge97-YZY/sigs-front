import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { delay, take, tap } from "rxjs/operators";

export class CrudService<T> {
  constructor(
    protected http: HttpClient,
    private API_URL: any
  ) { }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL).pipe(
      delay(2000),
      tap(console.log)
    )
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(
      take(1)
    );
  }
  create(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record).pipe(
      take(1)
    );
  }

  update(id: number, record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record).pipe(
      take(1)
    )
  }

  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      take(1)
    );
  }

}
