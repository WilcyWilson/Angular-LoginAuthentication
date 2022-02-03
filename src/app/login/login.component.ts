import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {RegistrationService} from "../registration.service";
import {Response} from "../response";
import {Router} from "@angular/router";

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
    responseStatus: true,
    responseMessage: ""
  }

  submitted = false;

  constructor(private service : RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.submitted = true;
    this.service.loginUserFromRemote(this.user).subscribe(response => {this.response = response;
    if(response.responseStatus){
      this.router.navigate(['/welcome']).then(() => {
      })
    }
    });
  }
}
