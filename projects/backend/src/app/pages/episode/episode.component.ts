import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public loading = false;
  public episodes:any[] = []

  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.metaService.setTitle(Language.getTitle('EPISODES'));
    this.metaService.setDescription(Language.getDescription('EPISODES'));
    this.getEpisodes();
  }

  public getEpisodes(){
    this.loading = true;

    this.adminApiService.adminGetEpisodes().subscribe({
      next: this.onLoadGetEpisodesSuccess.bind(this),
      error: this.onLoadGetEpisodesError.bind(this)
    });
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
    this.episodes = response;

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
