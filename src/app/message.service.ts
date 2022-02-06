import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private userName = "";

  constructor() { }

  public setUserName(userName: string){
    this.userName = userName;
  }

  public getUserName() : string{
    return this.userName;
  }
}
