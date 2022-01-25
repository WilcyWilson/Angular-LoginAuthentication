import {Component, OnInit} from '@angular/core';
import {Registration} from "../registration";
import {RegistrationService} from "../registration.service";
import {Response} from "../response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration: Registration = {
    address: "",
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNo: "",
    userName: ""
  }

  response: Response = {
    responseStatus: false,
    responseMessage: "null"
  }

  submitted = false;

  constructor(private service : RegistrationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(){
      this.submitted=true;
    this.service.registerUserFromRemote(this.registration).subscribe(response => {this.response = response;
      if(response.responseStatus){
        this.router.navigate(['/welcome']).then(() => {
        })
      }
    });
  }

}
