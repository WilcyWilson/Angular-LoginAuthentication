import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { User } from '../user';
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myObserver = {
    next: (x: number) => console.log('Response Received: ' + x),
    error: (err: Error) => console.error('Observer got an error: ' + err),
  };

  user = new User();

  constructor(private _service : RegistrationService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(this.myObserver);
  }

}
