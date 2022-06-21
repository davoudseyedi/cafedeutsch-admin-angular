import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AdminApiService} from "../../services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user:any = null;

  constructor(private authService: AuthService,
              private adminApiService: AdminApiService,
              private router: Router,) { }

  ngOnInit(): void {
    this.user = this.authService.getAdmin()
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


}
