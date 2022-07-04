import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminApiService} from "../../../services/api.service";
import {AlertService} from "../../../services/alert.service";
import {Language} from "../../../services/language";
import {MetaService} from "../../../services/meta.service";
import {ConfirmModalComponent} from "../../../components/confirm-modal/confirm-modal.component";
import {HelpersService} from "../../../services/helpers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;


  public page_heading = 'Blog Posts';

  public posts:any = [];
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

    this.metaService.setTitle(Language.getTitle('POSTS'));
    this.metaService.setDescription(Language.getDescription('POSTS'));


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

    this.getPosts();
  }

  public getPosts(){

    this.loading = true;

    this.adminApiService.adminGetBlog(this.paginationModel.currentPage,this.paginationModel.perPage,this.filterModel.sortDirection).subscribe({
      next: this.onLoadGetPostsSuccess.bind(this),
      error: this.onLoadGetPostsError.bind(this)
    });

  }

  public delete(id:number){
    this.loading = true;

    this.adminApiService.adminDeleteSinglePost(id).subscribe({
      next: this.onLoadDeletePostSuccess.bind(this),
      error: this.onLoadDeletePostError.bind(this)
    });
  }

  public onChangePageClick(page: any) {

    this.qParams.currentPage = page + '';
    this.helperService.changeRouteParams('/panel/posts', this.qParams);

    this.paginationModel.currentPage = page;
    this.getPosts();

  }


  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();

  }

  private onLoadGetPostsSuccess(response:any){

    this.loading = false;

    this.paginationModel.currentPage = response.meta.currentPage;
    this.paginationModel.total = response.meta.totalItems;
    this.paginationModel.perPage = response.meta.itemsPerPage;


    this.posts = response.items;

  }

  private onLoadGetPostsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadDeletePostSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The post successfully deleted.');
    this.getPosts();

  }

  private onLoadDeletePostError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

}
