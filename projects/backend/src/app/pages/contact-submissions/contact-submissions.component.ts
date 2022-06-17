import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "../../components/confirm-modal/confirm-modal.component";
import {AdminApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";
import {AlertService} from "../../services/alert.service";
import {Language} from "../../services/language";

@Component({
  selector: 'app-contact-submissions',
  templateUrl: './contact-submissions.component.html',
  styleUrls: ['./contact-submissions.component.scss']
})
export class ContactSubmissionsComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, {static: true}) public confirmModal!: ConfirmModalComponent;

  public loading = false;

  public submissions: any[] = [];

  constructor(private adminApiService: AdminApiService,
              private metaService: MetaService,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.metaService.setTitle(Language.getTitle('CONTACT_SUBMISSIONS'));
    this.metaService.setDescription(Language.getDescription('CONTACT_SUBMISSIONS'));
    this.getSubmissions();
  }

  public delete(id:number){
    this.loading = true;

    this.adminApiService.adminDeleteSubmission(id).subscribe({
      next: this.onLoadDeleteSuccess.bind(this),
      error: this.onLoadDeleteError.bind(this)
    });
  }

  public openModal(e:any){

    this.confirmModal.title = 'Delete action';
    this.confirmModal.description = 'Are you sure you want to delete this item?';
    this.confirmModal.item = e;
    this.confirmModal.openModal();

  }

  private getSubmissions(){
    this.loading = true;

    this.adminApiService.adminGetContactSubmissions().subscribe({
      next: this.onLoadGetSubmissionsSuccess.bind(this),
      error: this.onLoadGetSubmissionsError.bind(this)
    });
  }

  private onLoadGetSubmissionsSuccess(response:any){

    this.loading = false;
    this.submissions = response;

  }

  private onLoadGetSubmissionsError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

  private onLoadDeleteSuccess(response:any){

    this.loading = false;
    this.alertService.alertSuccess('The submission successfully deleted.');
    this.getSubmissions();

  }

  private onLoadDeleteError(error:any){

    this.loading = false;
    this.alertService.alertError(error.message)

  }

}
