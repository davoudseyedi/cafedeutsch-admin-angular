import { Component, OnInit } from '@angular/core';
import {MetaService} from "../../../services/meta.service";
import {AdminApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HelpersService} from "../../../services/helpers.service";
import {Language} from "../../../services/language";

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  public btnLoading = false;
  public loading = false;

  public category:any = {
    id: 0,
    title: '',
    description: ''
  }
  public errorModel:any = {
    title: '',
    description: ''
  }

  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('SINGLE_CATEGORY'));

    this.route.paramMap.subscribe(event => {

      const id: any = event.get('id');

      this.category.id = id !== 'add' ? parseInt(id, 10) : 0;

      if (this.category.id != 0) {

        this.loadCategory();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_CATEGORY_ADD'));
      }
    })

  }

  public submit(){
    if(this.category.id == 0){
      this.create()
    }else{
      this.editCategory()
    }
  }

  public delete(){
    this.loading = true;

    this.adminApiService.adminDeleteCategory(this.category.id).subscribe({
      next: this.onLoadDeleteCatSuccess.bind(this),
      error: this.onLoadDeleteCatError.bind(this)
    });
  }

  public create(){
    this.loading = true;

    let form:any = {
      'title': this.category.title,
      'description': this.category.description,
    }

    this.adminApiService.adminCreateCategory(form).subscribe({
      next: this.onLoadCreateCatSuccess.bind(this),
      error: this.onLoadCreateCatError.bind(this)
    });
  }

  public editCategory(){
    this.loading = true;
    let form:any = {
      'title': this.category.title,
      'description': this.category.description,
    }

    this.adminApiService.adminEditCategory(this.category.id,form).subscribe({
      next: this.onLoadEditCatSuccess.bind(this),
      error: this.onLoadEditCatError.bind(this)
    });
  }

  private loadCategory(){
    this.loading = true;

    this.adminApiService.adminGetCategoryById(this.category.id).subscribe({
      next: this.onLoadGetCategorySuccess.bind(this),
      error: this.onLoadGetCategoryError.bind(this)
    });
  }

  private makeCategoryItem(data:any){
    this.category = {
      id: data.id,
      title: data.title,
      description: data.description
    }

    this.metaService.setTitle(Language.getTitle('SINGLE_CATEGORY').replace('{{var}}', data.title));
  }

  private onLoadGetCategorySuccess(response:any){

    this.loading = false;
    this.makeCategoryItem(response);

  }

  private onLoadGetCategoryError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }
  private onLoadCreateCatSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Category successfully created.');

    this.router.navigateByUrl('/panel/categories');

  }

  private onLoadCreateCatError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }
  }

  private onLoadEditCatSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Category successfully Saved.');

  }

  private onLoadEditCatError(error:any){

    this.loading = false;
    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.errorModel,'title')
    }else{
      this.alertService.alertError(error.message)
    }
  }

  private onLoadDeleteCatSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The Category successfully deleted.');
    this.router.navigateByUrl('/panel/categories');

  }

  private onLoadDeleteCatError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }



}
