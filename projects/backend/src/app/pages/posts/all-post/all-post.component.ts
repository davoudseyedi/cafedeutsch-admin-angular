import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminApiService} from "../../../services/api.service";
import {AlertService} from "../../../services/alert.service";
import {Language} from "../../../services/language";
import {MetaService} from "../../../services/meta.service";
import {ConfirmModalComponent} from "../../../components/confirm-modal/confirm-modal.component";

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

  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private alertService:AlertService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('POSTS'));
    this.metaService.setDescription(Language.getDescription('POSTS'));
    this.getPosts();
  }

  public getPosts(){

    this.loading = true;

    this.adminApiService.adminGetBlog().subscribe({
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

  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();

  }

  private onLoadGetPostsSuccess(response:any){

    this.loading = false;
    this.posts = response;

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
