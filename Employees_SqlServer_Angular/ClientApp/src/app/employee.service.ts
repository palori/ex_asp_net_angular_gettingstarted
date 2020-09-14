import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from './employees/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'https://localhost:5001/api/employees';  // URL to web api
  //private employeesUrl = 'api/employees';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET employees from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        //tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  /** GET employee by id. Return `undefined` when id not found */
  getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} employee id=${id}`);
        }),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }

  /** GET employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/q/?name=${term}`).pipe(
      /*tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),*/
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }


  //////// Save methods //////////

  /** PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;

    return this.http.put(url, employee, this.httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee>{
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** POST: add a new hero to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
