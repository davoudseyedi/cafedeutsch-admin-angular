import { Component, OnInit } from '@angular/core';
import {Language} from "../../../services/language";
import {MetaService} from "../../../services/meta.service";
import {AdminApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HelpersService} from "../../../services/helpers.service";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  public btnLoading = false;
  public imgLoading = false;

  public user:any = {
    id:0,
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    password: '',
    mobile_number: '',
    profile_pic: '',
    roles: '',
    createdAt: '',
    updatedAt:'',
    active: false
  };

  public errorModel:any = {
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    password: '',
    mobile_number: '',
    profile_pic: '',
    roles: '',
    createdAt: '',
    updatedAt:'',
    active: 0
  }

  public profile_pic!:File;

  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('SINGLE_USER'));

    this.route.paramMap.subscribe(event => {

      const id:any = event.get('id');

      this.user.id = id !== 'add' ? parseInt(id, 10) : 0;

      if ( this.user.id != 0 ) {

        this.getUser();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_USER_ADD'));
      }

    });

  }


  public submit(){
    if(this.user.id != 0){
      this.updateUser()
    }else{
      this.createUser()
    }
  }

  public uploadPhoto(e:any){

    this.imgLoading = true;
    this.profile_pic = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

    let formData = new FormData();
    formData.append('avatar', this.profile_pic);

    this.adminApiService.adminAvatarUpload(formData).subscribe({
      next: this.onLoadUploadPhotoSuccess.bind(this),
      error: this.onLoadUploadPhotoError.bind(this)
    });
  }

  private createUser(){
    this.btnLoading = true;

    let form:any = {
      'first_name': this.user.first_name,
      'last_name': this.user.last_name,
      'email': this.user.email,
      'password': this.user.password,
      'mobile_number': this.user.mobile_number,
      'profile_pic': this.user.profile_pic,
      'roles': this.user.roles,
      'active': this.user.active
    }

    this.adminApiService.adminRegister(form).subscribe({
      next: this.onLoadUpdateUserSuccess.bind(this),
      error: this.onLoadUpdateUserError.bind(this)
    });
  }

  private updateUser(){
    this.btnLoading = true;

    let form:any = {
      'first_name': this.user.first_name,
      'last_name': this.user.last_name,
      'email': this.user.email,
      'password': this.user.password,
      'mobile_number': this.user.mobile_number,
      'profile_pic': this.user.profile_pic,
      'roles': this.user.roles,
      'active': this.user.active
    }

    this.adminApiService.adminUpdateProfile(this.user.id,form).subscribe({
      next: this.onLoadUpdateUserSuccess.bind(this),
      error: this.onLoadUpdateUserError.bind(this)
    });
  }

  private getUser(){
    this.btnLoading = true;

    this.adminApiService.adminGetProfile(this.user.id).subscribe({
      next: this.onLoadGetUserSuccess.bind(this),
      error: this.onLoadGetUserError.bind(this)
    });
  }

  private makeUserItem(data:any){
    this.user = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      email: data.email,
      full_name: data.full_name,
      mobile_number: data.mobile_number,
      profile_pic: data.profile_pic,
      roles: data.roles,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      active: data.active
    }
  }

  private onLoadGetUserSuccess(response: any){
    this.btnLoading = false;
    this.makeUserItem(response);
  }

  private onLoadGetUserError(error: any){
    this.btnLoading = false;
    this.alertService.alertError(error.message);
  }

  private onLoadUpdateUserSuccess(response: any){
    this.btnLoading = false;
    this.alertService.alertSuccess('The User successfully saved!')
  }

  private onLoadUpdateUserError(error: any){
    this.btnLoading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'first_name')
    }else{
      this.alertService.alertError(error.message);
    }

  }

  private onLoadUploadPhotoSuccess(response:any){

    this.imgLoading = false;
    this.user.profile_pic = response.filePath;
    this.alertService.alertSuccess('The avatar successfully uploaded.');

  }

  private onLoadUploadPhotoError(error:any){

    this.imgLoading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'first_name')
    }else{
      this.alertService.alertError(error.message)
    }


  }

}
