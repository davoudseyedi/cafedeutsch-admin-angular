import { Component, OnInit } from '@angular/core';
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";
import {HelpersService} from "../../services/helpers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users:any = [];
  public loading = false;

  public paginationModel: any = {
    currentPage: 1,
    total: 0,
    perPage: 25
  };

  public filterModel: any = {
    search: '',
    sort: 'createdAt',
    sortDirection: 'DESC',
    status: ''
  };

  public qParams: any = {
    search: '',
    perPage: '',
    currentPage: '',
    sort: '',
    sortDirection: '',
  };


  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private helperService: HelpersService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService:AlertService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('USERS'));
    this.metaService.setDescription(Language.getDescription('USERS'));

    let params = this.route.snapshot.queryParamMap;

    if (params.get('search')) {

      this.filterModel.search = params.get('search');
      this.qParams.search = params.get('search');

    }

    if (params.get('sortDirection')) {

      this.filterModel.sortDirection = params.get('sortDirection');
      this.qParams.sortDirection = params.get('sortDirection');

    }

    if (params.get('sort')) {

      this.filterModel.sort = params.get('sort');
      this.qParams.sort = params.get('sort');

    }

    this.getUsers();

  }

  private getUsers(){
    this.loading = true;

    this.adminApiService.adminGetUsers(this.paginationModel.currentPage,this.paginationModel.perPage,this.filterModel.sortDirection).subscribe({
      next: this.onLoadUsersSuccess.bind(this),
      error: this.onLoadUsersError.bind(this)
    });
  }

  public onChangePageClick(page: any) {

    this.qParams.currentPage = page + '';
    this.helperService.changeRouteParams('/panel/users', this.qParams);

    this.paginationModel.currentPage = page;
    this.getUsers();

  }


  private onLoadUsersSuccess(response:any){

    this.loading = false;

    this.paginationModel.currentPage = response.meta.currentPage;
    this.paginationModel.total = response.meta.totalItems;
    this.paginationModel.perPage = response.meta.itemsPerPage;


    this.users = response.items;
  }
  private onLoadUsersError(error:any){
    this.loading = false;
    this.alertService.alertError(error.message);
  }

}
