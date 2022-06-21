import { Component, OnInit } from '@angular/core';
import {MetaService} from "../../../services/meta.service";
import {AdminApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HelpersService} from "../../../services/helpers.service";
import {Language} from "../../../services/language";

@Component({
  selector: 'app-single-episode',
  templateUrl: './single-episode.component.html',
  styleUrls: ['./single-episode.component.scss']
})
export class SingleEpisodeComponent implements OnInit {

  public loading = false;
  public episode:any = {
    id: 0,
    title: '',
    category: {},
    season: {},
    description: '',
    episodeImage: '',
    episodeAudioFile: '',
    slug: '',
    published: true,
    featured: false,
    publish_date: ''
  }

  public image!:File;
  public audio!:File;
  public errorModel:any = {
    title: '',
    description: '',
    episodeImage: '',
    episodeAudioFile: '',
    featured: '',
    published: '',
    publish_date: '',
    category: '',
    season: '',
  }

  public category = '';
  public season = '';

  public cats:any[] = [];
  public seasons:any[] = [];

  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('SINGLE_EPISODE'));

    this.getCategories();
    this.route.paramMap.subscribe(event => {

      const id:any = event.get('id');

      this.episode.id = id !== 'add' ? parseInt(id, 10) : 0;

      if ( this.episode.id != 0 ) {

        this.loadEpisode();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_EPISODE_ADD'));
      }

    });

  }

  public submit(){
    if(this.episode.id == 0){
      this.create()
    }else{
      this.edit()
    }
  }

  public delete(){
    this.loading = true;

    this.adminApiService.adminDeleteSingleEpisode(this.episode.id).subscribe({
      next: this.onLoadDeleteEpisodeSuccess.bind(this),
      error: this.onLoadDeleteEpisodeError.bind(this)
    });
  }

  private create(){
    this.loading = true;

    let form :any = {
      'id': this.episode.id,
      'title': this.episode.title,
      'description': this.episode.description,
      'categoryId': this.category ? Number(this.category) : null,
      'seasonId': this.season ? Number(this.season) : null,
      'episodeImage': this.episode.episodeImage,
      'published': this.episode.published,
      'featured': this.episode.featured,
      'publish_date': this.episode.publish_date,
      'episodeAudioFile': this.episode.episodeAudioFile,
    }
    this.adminApiService.adminCreateSingleEpisode(form).subscribe({
      next: this.onLoadCreateEpisodeSuccess.bind(this),
      error: this.onLoadCreateEpisodeError.bind(this)
    });
  }

  private edit(){
    this.loading = true;

    let form :any = {
      'id': this.episode.id,
      'title': this.episode.title,
      'description': this.episode.description,
      'categoryId': this.category ? Number(this.category) : null,
      'seasonId': this.season ? Number(this.season) : null,
      'episodeImage': this.episode.episodeImage,
      'published': this.episode.published,
      'featured': this.episode.featured,
      'publish_date': this.episode.publish_date,
      'episodeAudioFile': this.episode.episodeAudioFile,
    }

    this.adminApiService.adminEditSingleEpisode(this.episode.id,form).subscribe({
      next: this.onLoadEditEpisodeSuccess.bind(this),
      error: this.onLoadEditEpisodeError.bind(this)
    });
  }

  public uploadPhoto(e:any){

    this.image = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

    let formData = new FormData();
    formData.append('episode-cover', this.image);

    this.adminApiService.adminEpisodeUploadPhoto(formData).subscribe({
      next: this.onLoadUploadPhotoSuccess.bind(this),
      error: this.onLoadUploadPhotoError.bind(this)
    });
  }

  public uploadAudio(e:any){

    this.audio = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

    let formData = new FormData();
    formData.append('episode-audio', this.audio);

    this.adminApiService.adminEpisodeUploadAudio(formData).subscribe({
      next: this.onLoadUploadAudioSuccess.bind(this),
      error: this.onLoadUploadAudioError.bind(this)
    });
  }



  private getCategories(){

    this.loading = true;

    this.adminApiService.adminGetCategories().subscribe({
      next: this.onLoadGetCatsSuccess.bind(this),
      error: this.onLoadGetCatsError.bind(this)
    });

  }

  private loadEpisode(){
    this.loading = true;

    this.adminApiService.adminGetSingleEpisode(this.episode.id).subscribe({
      next: this.onLoadGetEpisodeSuccess.bind(this),
      error: this.onLoadGetEpisodeError.bind(this)
    });
  }

  private makeEpisodeItem(data:any){
    this.episode = {
      id: data.id,
      title: data.title,
      category: data.category,
      season: data.season,
      description: data.description,
      episodeImage: data.episodeImage,
      episodeAudioFile: data.episodeAudioFile,
      slug: data.slug,
      published: data.published,
      featured: data.featured,
      publish_date: data.publish_date
    }

    this.category = data.category['id'] ? data.category['id'] : 0;
    this.season = data.season['id'] ? data.season['id'] : 0;

    this.metaService.setTitle(Language.getTitle('SINGLE_EPISODE').replace('{{var}}', data.title));
  }


  private onLoadGetCatsSuccess(response:any){

    this.loading = false;
    for (let item of response){
      if(item && item.slug.indexOf('level') > -1){
        this.cats = item.children;
      }
      if(item && item.slug.indexOf('season') > -1){
        this.seasons = item.children;
      }
    }


  }

  private onLoadGetCatsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadGetEpisodeSuccess(response:any){

    this.loading = false;
    this.makeEpisodeItem(response);

  }

  private onLoadGetEpisodeError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadCreateEpisodeSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Episode successfully saved.');
    this.router.navigateByUrl('/panel/episodes');

  }

  private onLoadCreateEpisodeError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }

  }

  private onLoadEditEpisodeSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Episode successfully saved.');
    this.router.navigateByUrl('/panel/episodes');

  }

  private onLoadEditEpisodeError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }

  }

  private onLoadDeleteEpisodeSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The episode successfully deleted.');
    this.router.navigateByUrl('/panel/episodes');

  }

  private onLoadDeleteEpisodeError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadUploadPhotoSuccess(response:any){

    this.loading = false;
    this.episode.episodeImage = response.filePath;
    this.alertService.alertSuccess('The Image successfully uploaded.');

  }

  private onLoadUploadPhotoError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }


  }

  private onLoadUploadAudioSuccess(response:any){

    this.loading = false;
    this.episode.episodeAudioFile = response.filePath;
    this.alertService.alertSuccess('The Audio File successfully uploaded.');

  }

  private onLoadUploadAudioError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }


  }


}
