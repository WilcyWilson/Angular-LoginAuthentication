import {Component, OnInit} from '@angular/core';
import {Login} from "../login";
import {RegistrationService} from "../registration.service";
import {MessageService} from "../message.service";
import {Approve} from "../approve";
import {Response} from "../response";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  response: Response = {
    responseStatus: true,
    responseMessage: ""
  }

  page = 1;
  pageSize = 5;
  count = 0;
  email="";
  userName="";
  createdBy="";
  status=1;

  user = "";

  logins: Login[] = [];

  approve: Approve = {
    approver: "",
    destinationUser: ""
  }

  constructor(private service : RegistrationService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getData();
    this.user = this.messageService.getUserName();
  }

  getData():void{
    const params = this.getRequestParams(this.email, this.userName, this.createdBy, this.status, this.page, this.pageSize);
    this.service.getDataFromRemote(params).subscribe(response => {
      const { logins, totalItems } = response;
      this.logins = logins;
      this.count = totalItems;
      console.log(response);
    });
  }

  checkBlockStatus(userName: string): void {
    this.approve.approver = this.user;
    this.approve.destinationUser = userName;
    this.service.blockUnblockFromRemote(this.approve).subscribe(response => {
      this.response = response;
      if(response.responseStatus){
            console.log("success");
      }
    });
}

  handlePageChange(event: number): void {
    this.page = event;
    this.getData();
  }

  search(): void {
    this.page = 1;
    this.getData();
  }

  getRequestParams(email: string, userName: string, createdBy: string, status: number, page: number, pageSize: number): any {
    let params: any = {};

    if (email) {
      params[`email`] = email;
    }

    if (userName) {
      params[`userName`] = userName;
    }

    if (status == 2) {
      params[`status`] = 1;
    } else if (status == 3){
      params[`status`] = 0;
    }

    if (createdBy) {
      params[`createdBy`] = createdBy;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

}
