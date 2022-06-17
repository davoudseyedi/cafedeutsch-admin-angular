import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";
import {ActivatedRoute, Router} from "@angular/router";
import {HelpersService} from "../../services/helpers.service";

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public terms:any = [];
  public parentName = '';
  public loading = false;

  parentId = 0;

  constructor(private metaService: MetaService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private helperService: HelpersService,
              private router: Router ) { }

  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('CATEGORIES'));

    this.route.paramMap.subscribe(event => {

      const id: any = event.get('pid');

      this.parentId = id !== 'add' ? parseInt(id, 10) : 0;

      if (this.parentId != 0) {

        this.getChilds();

      }else{
        this.metaService.setTitle(Language.getTitle('SINGLE_CATEGORY_ADD'));
      }
    })


  }

  public getChilds(){

    this.loading = true;

    this.adminApiService.adminGetCategoryChildren(this.parentId).subscribe({
      next: this.onLoadGetTermsSuccess.bind(this),
      error: this.onLoadGetTermsError.bind(this)
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
  private onLoadGetTermsSuccess(response:any){

    this.loading = false;
    this.terms = response.children;
    this.parentName = response.title;

    this.metaService.setTitle(Language.getTitle('TERMS').replace('{{var}}', response.title));

  }

  private onLoadGetTermsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadDeleteCategorySuccess(response: any){
    this.loading = false;
    this.alertService.alertSuccess('The Term successfully deleted.');
    this.getChilds();

  }

  private onLoadDeleteCategoryError(error: any){
    this.loading = false;
    this.alertService.alertError(error.message)
  }

}
