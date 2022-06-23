import { Component, OnInit } from '@angular/core';
import {MetaService} from "../../../services/meta.service";
import {Language} from "../../../services/language";
import {AdminApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HelpersService} from "../../../services/helpers.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  public loading = false;
  public imgLoading = false;
  public post:any = {
    id: 0,
    title: '',
    category: {},
    content: '',
    mainImageUrl: '',
    slug: '',
    published: true
  }

  public image!:File;
  public errorModel:any = {
    title: '',
    content: '',
    mainImageUrl: '',
    published: '',
    category: ''
  }

  public category = '';

  public cats:any[] = []

  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {
    this.metaService.setDescription(Language.getDescription('SINGLE_POST'));

    this.getCategories();
    this.route.paramMap.subscribe(event => {

      const id:any = event.get('id');

      this.post.id = id !== 'add' ? parseInt(id, 10) : 0;

      if ( this.post.id != 0 ) {

        this.loadPost();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_POST_ADD'));
      }

    });
  }

  public submit(){
    if(this.post.id == 0){
      this.create()
    }else{
      this.editPost()
    }
  }

  public uploadPhoto(e:any){

    this.imgLoading = true;
    this.image = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

    let formData = new FormData();
    formData.append('picture', this.image);

    this.adminApiService.adminPostUploadPhoto(formData).subscribe({
      next: this.onLoadUploadPhotoSuccess.bind(this),
      error: this.onLoadUploadPhotoError.bind(this)
    });
  }

  public delete(){
    this.loading = true;

    this.adminApiService.adminDeleteSinglePost(this.post.id).subscribe({
      next: this.onLoadDeletePostSuccess.bind(this),
      error: this.onLoadDeletePostError.bind(this)
    });
  }
  private create(){
    this.loading = true;

    let form :any = {
      'id': this.post.id,
      'title': this.post.title,
      'content': this.post.content,
      'categoryId': this.category ? Number(this.category) : null,
      'mainImageUrl': this.post.mainImageUrl,
      'published': this.post.published
    }
    this.adminApiService.adminCreateSinglePost(form).subscribe({
      next: this.onLoadCreatePostSuccess.bind(this),
      error: this.onLoadCreatePostError.bind(this)
    });
  }

  private editPost(){
    this.loading = true;

    let form :any = {
      'id': this.post.id,
      'title': this.post.title,
      'content': this.post.content,
      'categoryId':this.category ? Number(this.category): null,
      'mainImageUrl': this.post.mainImageUrl,
      'published': this.post.published
    }
    this.adminApiService.adminEditSinglePost(this.post.id,form).subscribe({
      next: this.onLoadEditPostSuccess.bind(this),
      error: this.onLoadEditPostError.bind(this)
    });
  }


  private loadPost(){
    this.loading = true;

    this.adminApiService.adminGetSinglePost(this.post.id).subscribe({
      next: this.onLoadGetPostSuccess.bind(this),
      error: this.onLoadGetPostError.bind(this)
    });
  }

  private makePost(data:any){
    this.post = {
      id: data.id,
      title: data.title,
      category: data.category,
      content:data.content,
      mainImageUrl: data.mainImageUrl,
      slug: data.slug,
      published: data.published
    }

    this.category = data.category['id'] ? data.category['id'] : 0;

    this.metaService.setTitle(Language.getTitle('SINGLE_POST').replace('{{var}}', data.title));
  }

  public getCategories(){

    this.loading = true;

    this.adminApiService.adminGetCategories().subscribe({
      next: this.onLoadGetCatsSuccess.bind(this),
      error: this.onLoadGetCatsError.bind(this)
    });

  }

  private onLoadGetCatsSuccess(response:any){

    this.loading = false;
    for (let item of response){
      if(item && item.slug.indexOf('blog_category') > -1){
        this.cats = item.children;
      }
    }


  }

  private onLoadGetCatsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadGetPostSuccess(response:any){

    this.loading = false;
    this.makePost(response);

  }

  private onLoadGetPostError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }


  private onLoadCreatePostSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The post successfully saved.');
    this.router.navigateByUrl('/panel/posts');

  }

  private onLoadCreatePostError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }


  }

  private onLoadEditPostSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The post successfully saved.');
    this.router.navigateByUrl('/panel/posts');

  }

  private onLoadEditPostError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }

  }
  private onLoadDeletePostSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The post successfully deleted.');
    this.router.navigateByUrl('/panel/posts');

  }

  private onLoadDeletePostError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadUploadPhotoSuccess(response:any){

    this.imgLoading = false;
    this.post.mainImageUrl = response.filePath;
    this.alertService.alertSuccess('The Image successfully uploaded.');

  }

  private onLoadUploadPhotoError(error:any){

    this.imgLoading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }


  }


}
