import { Component, OnInit } from '@angular/core';
import {Login} from "../login";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  page = 1;
  pageSize = 5;
  count = 0;

  logins: Login[] = [];

  constructor(private service : RegistrationService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    const params = this.getRequestParams(this.page, this.pageSize);
    this.service.getDataFromRemote(params).subscribe(response => {
      const { logins, totalItems } = response;
      this.logins = logins;
      this.count = totalItems;
      console.log(response);
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getData();
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

}
