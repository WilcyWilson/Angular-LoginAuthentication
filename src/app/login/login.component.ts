import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {RegistrationService} from "../registration.service";
import {Response} from "../response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = {
    userName: "",
    password: ""
  }
  response: Response = {
    responseStatus: false,
    responseMessage: "null"
  }

  constructor(private service : RegistrationService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.service.loginUserFromRemote(this.user).subscribe(response => {this.response = response;});
  }

}
