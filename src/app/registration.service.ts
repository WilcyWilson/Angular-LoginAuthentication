import {Injectable} from '@angular/core';
import {User} from "./user";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from 'rxjs/operators';
import {Response} from "./response";
import {Registration} from "./registration";
import {Login} from "./login";
import {Approve} from "./approve";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private checkUserUrl = "http://localhost:8080/checkUser";
  private registerUserUrl = "http://localhost:8080/registerUser";
  private getDataUrl = "http://localhost:8080/getData";
  private checkApprovalUrl = "http://localhost:8080/checkApproval"
  private blockApprovalUrl = "http://localhost:8080/blockApproval"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
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

  unblockFromRemote(approve: Approve): Observable<Response> {
    return this.http.post<Response>(this.checkApprovalUrl, approve, this.httpOptions).pipe(
      tap((response: Response) => this.log(`Response Status =${response.responseStatus} and
      Response Message=${response.responseMessage}`)),
      catchError(this.handleError<Response>('unblockFromRemote'))
    );
  }

  blockFromRemote(approve: Approve): Observable<Response> {
    return this.http.post<Response>(this.blockApprovalUrl, approve, this.httpOptions).pipe(
      tap((response: Response) => this.log(`Response Status =${response.responseStatus} and
      Response Message=${response.responseMessage}`)),
      catchError(this.handleError<Response>('unblockFromRemote'))
    );
  }

  registerUserFromRemote(registration: Registration): Observable<Response> {
    return this.http.post<Response>(this.registerUserUrl, registration, this.httpOptions).pipe(
      tap((response: Response) => this.log(`Response Status =${response.responseStatus} and
      Response Message=${response.responseMessage}`)),
      catchError(this.handleError<Response>('registerUserFromRemote'))
    );
  }

  getDataFromRemote(params: any): Observable<any> {
    return this.http.get<any>(this.getDataUrl, {params}).pipe(
      tap(_ => this.log('fetched data')),
      catchError(this.handleError<Login[]>('getDataFromRemote'))
    );
  }
}
