import {Injectable} from '@angular/core';
import {User} from "./user";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import {Response} from "./response";
import {Registration} from "./registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private checkUserUrl = "http://localhost:8080/checkUser";
  private registerUserUrl = "http://localhost:8080/registerUser"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  loginUserFromRemote(user: User): Observable<Response> {
    return this.http.post<Response>(this.checkUserUrl, user, this.httpOptions).pipe(
      tap((response: Response) => this.log(`Response Status =${response.responseStatus} and
      Response Message=${response.responseMessage}`)),
      catchError(this.handleError<Response>('loginUserFromRemote'))
    );
  }

  registerUserFromRemote(registration: Registration): Observable<Response> {
    return this.http.post<Response>(this.registerUserUrl, registration, this.httpOptions).pipe(
      tap((response: Response) => this.log(`Response Status =${response.responseStatus} and
      Response Message=${response.responseMessage}`)),
      catchError(this.handleError<Response>('loginUserFromRemote'))
    );
  }
}
