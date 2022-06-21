import { Component, OnInit } from '@angular/core';
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users:any = [];
  public loading = false;

  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private alertService:AlertService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('USERS'));
    this.metaService.setDescription(Language.getDescription('USERS'));
    this.getUsers();

  }

  private getUsers(){
    this.loading = true;

    this.adminApiService.adminGetUsers().subscribe({
      next: this.onLoadUsersSuccess.bind(this),
      error: this.onLoadUsersError.bind(this)
    });
  }

  private onLoadUsersSuccess(response:any){
    this.loading = false;
    this.users = response;
  }
  private onLoadUsersError(error:any){
    this.loading = false;
    this.alertService.alertError(error.message);
  }

}
