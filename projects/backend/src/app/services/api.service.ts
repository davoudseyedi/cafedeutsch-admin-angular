import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminConfig } from "./admin-config";

@Injectable()

export class AdminApiService {

  public config:any = AdminConfig;

  constructor( private http: HttpClient ) { }


  // Auth

  public adminLogin(form:any) {

    return this.http.post(this.config.ADMIN_LOGIN , form);

  }
  public adminRegister(form:any) {

    return this.http.post(this.config.ADMIN_REGISTER , form);

  }
  public logout(form:any) {

    return this.http.post(this.config.ADMIN_LOGOUT , form);

  }

  public adminGetProfile(id:number) {

    return this.http.get(this.config.ADMIN_GET_PROFILE + '/' + id);

  }

  public adminUpdateProfile(id:number,form:any) {

    return this.http.patch(this.config.ADMIN_GET_PROFILE + '/' + id ,form);

  }

  public adminGetUsers(page=1,limit=25,sortDirection= '') {

    return this.http.get(this.config.ADMIN_LIST_USERS + '?page=' + page + '&limit=' + limit + '&order=' + sortDirection);

  }


  public adminAvatarUpload(form:any) {

    return this.http.post(this.config.ADMIN_AVATAR_UPLOAD,form);

  }


  // Post

  public adminGetBlog(page = 1, limit = 25, sortDirection = '') {

    return this.http.get(this.config.ADMIN_GET_ALL_POSTS + '?page=' + page + '&limit=' + limit + '&order=' + sortDirection);

  }

  public adminGetSinglePost(id:number) {

    return this.http.get(this.config.ADMIN_GET_ALL_POSTS + '/' + id);

  }

  public adminCreateSinglePost(form:any) {

    return this.http.post(this.config.ADMIN_GET_ALL_POSTS,form);

  }
  public adminEditSinglePost(id:number,form:any) {

    return this.http.patch(this.config.ADMIN_GET_ALL_POSTS + '/' + id,form);

  }
  public adminDeleteSinglePost(id:number) {

    return this.http.delete(this.config.ADMIN_GET_ALL_POSTS + '/' + id);

  }
  public adminPostUploadPhoto(form:any) {

    return this.http.post(this.config.ADMIN_GET_ALL_POSTS + '/upload-photo',form);

  }


  // Category

  public adminGetCategories() {

    return this.http.get(this.config.ADMIN_GET_ALL_CATEGORIES);

  }

  public adminGetParents() {

    return this.http.get(this.config.ADMIN_GET_ALL_CATEGORIES + '/parents');

  }

  public adminGetCategoryById(id: number) {

    return this.http.get(this.config.ADMIN_GET_ALL_CATEGORIES + '/' + id);

  }

  public adminGetCategoryChildren(id: number) {

    return this.http.get(this.config.ADMIN_GET_ALL_CATEGORIES + '/child/' + id);

  }

  public adminCreateCategory(form: any) {

    return this.http.post(this.config.ADMIN_GET_ALL_CATEGORIES,form);

  }

  public adminEditCategory(id:number,form: any) {

    return this.http.patch(this.config.ADMIN_GET_ALL_CATEGORIES + '/' + id,form);

  }

  public adminDeleteCategory(id:number) {

    return this.http.delete(this.config.ADMIN_GET_ALL_CATEGORIES + '/' + id);

  }

  // Episodes

  public adminGetEpisodes(page = 1, limit = 25, sortDirection = '') {

    return this.http.get(this.config.ADMIN_GET_ALL_EPISODES + '?page=' + page + '&limit=' + limit + '&order=' + sortDirection);

  }

  public adminGetSingleEpisode(id:number) {

    return this.http.get(this.config.ADMIN_GET_ALL_EPISODES + '/' + id);

  }

  public adminCreateSingleEpisode(form:any) {

    return this.http.post(this.config.ADMIN_GET_ALL_EPISODES,form);

  }

  public adminEditSingleEpisode(id:number,form:any) {

    return this.http.patch(this.config.ADMIN_GET_ALL_EPISODES + '/' + id,form);

  }

  public adminDeleteSingleEpisode(id:number) {

    return this.http.delete(this.config.ADMIN_GET_ALL_EPISODES + '/' + id);

  }

  public adminEpisodeUploadPhoto(form:any) {

    return this.http.post(this.config.ADMIN_GET_ALL_EPISODES + '/upload-cover',form);

  }
  public adminEpisodeUploadAudio(form:any) {

    return this.http.post(this.config.ADMIN_GET_ALL_EPISODES + '/upload-audio',form);

  }

  // Contact
  public adminGetContactSubmissions(page = 1,limit= 25,sortDirection = '') {

    return this.http.get(this.config.ADMIN_GET_ALL_CONTACT_SUBMISSIONS + '?page=' + page + '&limit=' + limit + '&order=' + sortDirection);

  }


  public adminDeleteSubmission(id:number) {

    return this.http.delete(this.config.ADMIN_GET_ALL_CONTACT_SUBMISSIONS + '/' + id);

  }

}
