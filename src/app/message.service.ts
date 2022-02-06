import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private userName : any;

  constructor() { }

  public setUserName(userName: string){
    this.userName = userName;
  }

  public getUserName() : string{
    return this.userName;
  }

  public hasUserName(){
    return this.userName && this.userName.length;
  }
}
