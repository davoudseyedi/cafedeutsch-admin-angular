import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AdminApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MetaService} from "../../services/meta.service";
import {HelpersService} from "../../services/helpers.service";
import {Language} from "../../services/language";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formModel: any = {
    email: '',
    password: '',
  };
  public errorModel: any = {
    email: '',
    password: ''
  };

  private redirectLink :string = '/panel';
  public btnLoading: boolean = false;

  constructor(private authService: AuthService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private metaService: MetaService,
              private router: Router,
              private alertService: AlertService,
              private helpersService: HelpersService) {
  }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('LOGIN'));
    this.metaService.setDescription(Language.getDescription('LOGIN'));

    const redirect = this.route.snapshot.queryParamMap.get('redirect_link');

    if (redirect && redirect.length > 0) {
      this.redirectLink = redirect;
    }

    if (this.authService.isAdmin()) {
      this.redirectUser();
    }
  }

  public login() {

    this.clearErrorModel();

    if (this.validateModel()) {

      this.btnLoading = true;
      this.adminApiService
        .adminLogin(this.formModel)
        .subscribe({
          next: this.loginApiSuccess.bind(this),
          error: this.loginApiError.bind(this)
        });

    }

  }

  private clearErrorModel() {

    this.errorModel = {
      email: '',
      password: ''
    };

  }

  private redirectUser() {

    this.router.navigateByUrl(this.redirectLink);

  }

  private validateModel() {

    let valid = true;
    let checkEmail = this.formModel.email.includes("@");

    if (!this.formModel.email || this.formModel.email.length == 0) {

      valid = false;
      this.errorModel.email = 'This field is required';

    } else if (!checkEmail) {

      valid = false;
      this.errorModel.email = 'please enter a valid email';

    }

    if (!this.formModel.password || this.formModel.password.length == 0) {

      valid = false;
      this.errorModel.password = 'This field is required';

    }

    return valid;

  }

  private loginApiSuccess(response:any) {

    if(response.user.roles === 'Admin' && response.user.active ){
      this.authService.setAdminToken(response.access_token);
      this.authService.setAdmin(response.user);

    }else{
      this.alertService.alertWarn('You have no access.')
    }

    this.redirectUser();

  }

  private loginApiError(error:any) {

    if (error.statusCode == 401) {

      this.errorModel.email = 'Username or Password is not correct';

    } else {

      this.helpersService.handleResponseError(error, this.errorModel, 'email');

    }

    this.btnLoading = false;

  }

}
