import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";
import {HelpersService} from "../../services/helpers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contact-submissions',
  templateUrl: './contact-submissions.component.html',
  styleUrls: ['./contact-submissions.component.scss']
})
export class ContactSubmissionsComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public loading = false;

  public submissions: any[] = [];

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
    this.metaService.setTitle(Language.getTitle('CONTACT_SUBMISSIONS'));
    this.metaService.setDescription(Language.getDescription('CONTACT_SUBMISSIONS'));

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


    this.getSubmissions();
  }

  public delete(id:number){
    this.loading = true;

    this.adminApiService.adminDeleteSubmission(id).subscribe({
      next: this.onLoadDeleteSuccess.bind(this),
      error: this.onLoadDeleteError.bind(this)
    });
  }

  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();

  }

  public onChangePageClick(page: any) {

    this.qParams.currentPage = page + '';
    this.helperService.changeRouteParams('/panel/submissions', this.qParams);

    this.paginationModel.currentPage = page;
    this.getSubmissions();

  }


  private getSubmissions(){
    this.loading = true;

    this.adminApiService.adminGetContactSubmissions(this.paginationModel.currentPage,this.paginationModel.perPage,this.filterModel.sortDirection).subscribe({
      next: this.onLoadGetSubmissionsSuccess.bind(this),
      error: this.onLoadGetSubmissionsError.bind(this)
    });
  }

  private onLoadGetSubmissionsSuccess(response:any){

    this.loading = false;

    this.paginationModel.currentPage = response.meta.currentPage;
    this.paginationModel.total = response.meta.totalItems;
    this.paginationModel.perPage = response.meta.itemsPerPage;


    this.submissions = response.items;

  }

  private onLoadGetSubmissionsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadDeleteSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The submission successfully deleted.');
    this.getSubmissions();

  }

  private onLoadDeleteError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

}
