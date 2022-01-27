import { Component, OnInit } from '@angular/core';
import {Login} from "../login";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  logins: Login[] = [];

  constructor(private service : RegistrationService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
      this.service.getDataFromRemote().subscribe(logins => this.logins = logins);
  }

}
