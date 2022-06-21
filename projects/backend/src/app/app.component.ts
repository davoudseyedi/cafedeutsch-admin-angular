import {Component, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { AuthService } from "./services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {AdminApiService} from "./services/api.service";
import {isPlatformBrowser} from "@angular/common";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ToastContainerDirective, { static: false }) toastContainer!: ToastContainerDirective;


  public collapseMenu:boolean = false;

  public dataLoaded = false;

  public showMenu = false;

  public hideHeader = false;

  public hideSidebar = false;

  public userId: number = 0;

  public theme:string = '';

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private adminApiService: AdminApiService,
               private authService: AuthService,
               private toastrService: ToastrService,
               private localStorage : LocalStorageService,
               public router: Router ) {


    router.events.subscribe((path) => {

      if ( path instanceof NavigationEnd ) {

        this.hideSidebar = false;

        let pathUrl = path.url;

        if( pathUrl.indexOf('/panel') > -1){
          this.hideHeader = true;
          this.dataLoaded = true
        }else{
          this.hideHeader = false;
        }

        if ( isPlatformBrowser(this.platformId) ) {

          if(pathUrl.indexOf('switchTab=true') == -1){
            window.scrollTo(0, 0);
          }


        }

      }
    });
  }

  /**
   * ngOnInit()
   */
  public ngOnInit() {

    this.toastrService.overlayContainer = this.toastContainer;
    this.userId = this.authService.getAdmin()['id']

    this.handelBody();
    this.getAdminProfile(this.userId);

  }

  private getAdminProfile(id:number) {

    this.adminApiService.adminGetProfile(id).subscribe({
      next: this.onLoadDataSuccess.bind(this),
      error: this.onLoadDataError.bind(this)
    });

  }
  private onLoadDataSuccess(response:any) {

    this.authService.setAdmin(response);
    this.dataLoaded = true;

  }

  private onLoadDataError() {

    this.authService.logoutAdmin();
    this.router.navigateByUrl('/login');

  }

  public handelBody(){
    this.theme = this.localStorage.getItem('theme');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(this.theme);
  }

}
