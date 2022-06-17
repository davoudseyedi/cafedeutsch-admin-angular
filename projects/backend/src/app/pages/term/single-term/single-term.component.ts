import {Component, OnInit} from '@angular/core';
import {MetaService} from "../../../services/meta.service";
import {AdminApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HelpersService} from "../../../services/helpers.service";
import {Language} from "../../../services/language";

@Component({
  selector: 'app-single-term',
  templateUrl: './single-term.component.html',
  styleUrls: ['./single-term.component.scss']
})
export class SingleTermComponent implements OnInit {

  public btnLoading = false;
  public loading = false;

  public term:any = {
    id: 0,
    title: '',
    description: '',
    parentId: 0
  }

  public parentId = 0;
  public parents: any[] = [];

  public errorModel:any = {
    title: '',
    description: '',
    parentId:''
  }


  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('SINGLE_CATEGORY'));

    this.loadParents();

    this.route.paramMap.subscribe(event => {

      const id: any = event.get('cid');
      this.parentId = parseInt(<string>event.get('pid'),10);
      this.term.id = id !== 'add' ? parseInt(id, 10) : 0;

      if (this.term.id != 0) {

        this.loadTerm();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_CATEGORY_ADD'));
      }
    })

  }

  public submit(){
    if(this.term.id == 0){
      this.create()
    }else{
      this.editCategory()
    }
  }

  public delete(){
    this.loading = true;

    this.adminApiService.adminDeleteCategory(this.term.id).subscribe({
      next: this.onLoadDeleteCatSuccess.bind(this),
      error: this.onLoadDeleteCatError.bind(this)
    });
  }

  public create(){
    this.loading = true;

    let form:any = {
      'title': this.term.title,
      'description': this.term.description,
      'parentId': this.term.parentId
    }

    this.adminApiService.adminCreateCategory(form).subscribe({
      next: this.onLoadCreateCatSuccess.bind(this),
      error: this.onLoadCreateCatError.bind(this)
    });
  }

  public editCategory(){
    this.loading = true;
    let form:any = {
      'title': this.term.title,
      'description': this.term.description,
      'parentId': Number(this.term.parentId)
    }

    this.adminApiService.adminEditCategory(this.term.id,form).subscribe({
      next: this.onLoadEditCatSuccess.bind(this),
      error: this.onLoadEditCatError.bind(this)
    });
  }

  private loadTerm(){
    this.loading = true;

    this.adminApiService.adminGetCategoryById(this.term.id).subscribe({
      next: this.onLoadGetCategorySuccess.bind(this),
      error: this.onLoadGetCategoryError.bind(this)
    });
  }

  private loadParents(){
    this.loading = true;

    this.adminApiService.adminGetParents().subscribe({
      next: this.onLoadParentsSuccess.bind(this),
      error: this.onLoadParentsError.bind(this)
    });
  }

  private makeCategoryItem(data:any){
    this.term = {
      id: data.id,
      title: data.title,
      description: data.description,
      parentId:data.parentId
    }

    this.metaService.setTitle(Language.getTitle('SINGLE_TERM').replace('{{var}}', data.title));
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

    this.router.navigateByUrl('/panel/categories/'+ this.parentId + '/term');

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

  private onLoadParentsSuccess(response: any){
    this.loading = false;
    this.parents = response;
  }
  private onLoadParentsError(error: any){
    this.loading = false;
    this.alertService.alertError(error.message)
  }

}
