import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AdminApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MetaService} from "../../services/meta.service";
import {HelpersService} from "../../services/helpers.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public theme = 0;

  constructor(private authService: AuthService,
              private adminApiService: AdminApiService,
              private route: ActivatedRoute,
              private metaService: MetaService,
              private router: Router,
              private localStorage: LocalStorageService,
              private helpersService: HelpersService) { }

  ngOnInit(): void {
    this.theme = this.localStorage.getItem('theme') == 'theme-dark' ? 1: 0;
  }


  public logout(){
    this.adminApiService
      .logout({})
      .subscribe({
        next: this.logoutApiSuccess.bind(this),
        error: this.logoutApiError.bind(this)
      });

  }

  private logoutApiSuccess(response:any) {

    this.authService.logoutAdmin();
    this.router.navigateByUrl('/login');

  }

  private logoutApiError(error:any) {

    console.log('error')

  }

  public toggleDarkTheme(e:any) {

    this.setTheme(
      document.body.classList.contains("theme-dark")
        ? "theme-light"
        : "theme-dark"
    ,e);
  }

  public setTheme(theme:any, dontPersist:any) {
    document.body.className = document.body.className.replace(/\btheme-[a-z0-9]+\b/g, "");
    document.body.classList.add(theme);

    // const toggler = document.getElementById("toggle-dark");

    dontPersist.target.checked = theme == "theme-dark";

    this.theme = this.localStorage.getItem('theme');
    if ( dontPersist.target.checked) {
      this.localStorage.removeItem('theme');
      this.localStorage.setItem('theme', 'theme-dark' );
    }else{
      this.localStorage.removeItem('theme');
      this.localStorage.setItem('theme', 'theme-light');
    }
  }


}
