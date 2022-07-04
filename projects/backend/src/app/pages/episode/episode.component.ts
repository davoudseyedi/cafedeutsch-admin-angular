import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";
import {HelpersService} from "../../services/helpers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public loading = false;
  public episodes:any[] = [];

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
    this.metaService.setTitle(Language.getTitle('EPISODES'));
    this.metaService.setDescription(Language.getDescription('EPISODES'));

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


    this.getEpisodes();
  }

  public getEpisodes(){
    this.loading = true;

    this.adminApiService.adminGetEpisodes(this.paginationModel.currentPage,this.paginationModel.perPage,this.filterModel.sortDirection).subscribe({
      next: this.onLoadGetEpisodesSuccess.bind(this),
      error: this.onLoadGetEpisodesError.bind(this)
    });
  }

  public onChangePageClick(page: any) {

    this.qParams.currentPage = page + '';
    this.helperService.changeRouteParams('/panel/episodes', this.qParams);

    this.paginationModel.currentPage = page;
    this.getEpisodes();

  }

  public delete(id:number){
    this.loading = true;

    this.adminApiService.adminDeleteSingleEpisode(id).subscribe({
      next: this.onLoadDeletePostSuccess.bind(this),
      error: this.onLoadDeletePostError.bind(this)
    });
  }

  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();

  }


  private onLoadGetEpisodesSuccess(response:any){

    this.loading = false;

    this.paginationModel.currentPage = response.meta.currentPage;
    this.paginationModel.total = response.meta.totalItems;
    this.paginationModel.perPage = response.meta.itemsPerPage;

    this.episodes = response.items;

  }

  private onLoadGetEpisodesError(error:any){

    this.loading = false;
    this.alertService.alertError(error)

  }

  private onLoadDeletePostSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Episode successfully deleted.');
    this.getEpisodes();

  }

  private onLoadDeletePostError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

}
