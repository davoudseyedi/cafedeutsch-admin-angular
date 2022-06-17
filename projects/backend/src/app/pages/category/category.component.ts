import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public cats:any = [];
  public loading = false;

  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private alertService:AlertService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('CATEGORIES'));
    this.metaService.setDescription(Language.getDescription('CATEGORIES'));

    this.getCategories();
  }

  public getCategories(){

    this.loading = true;

    this.adminApiService.adminGetCategories().subscribe({
      next: this.onLoadGetCatssSuccess.bind(this),
      error: this.onLoadGetCatsError.bind(this)
    });

  }

  public delete(id:number){
    this.loading = true;

    this.adminApiService.adminDeleteCategory(id).subscribe({
      next: this.onLoadDeleteCategorySuccess.bind(this),
      error: this.onLoadDeleteCategoryError.bind(this)
    });
  }

  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();
  }
  private onLoadGetCatssSuccess(response:any){

    this.loading = false;
    this.cats = response;

  }

  private onLoadGetCatsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadDeleteCategorySuccess(response: any){
    this.loading = false;
    this.alertService.alertSuccess('The post successfully deleted.');
    this.getCategories();

  }

  private onLoadDeleteCategoryError(error: any){
    this.loading = false;
    this.alertService.alertError(error.message)
  }

}
