import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { AuthService } from "./auth.service";
import {AlertService} from "./alert.service";
import {AdminConfig} from "./admin-config";

@Injectable()

export class AdminGuardService implements CanActivate {

    constructor( private router: Router,
                private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId: Object,
                 private alertService: AlertService ) {}

    /**
     *
     * @param prev
     * @param next
     * @returns {boolean}
     */
    public canActivate(prev:any, next:any) {

        let isAdmin = this.authService.getAdmin();
        if ( isAdmin ) {

          return true;

        }


        // In server node must render page.
        if ( !isPlatformBrowser(this.platformId) ) {

            return true;

        }

        if ( this.authService.isAdmin() ) {

            this.router.navigateByUrl("/panel/dashboard");
            this.alertService.alertError('شما به بخش مورد نظر دسترسی ندارید');
            return false;

        }

        this.router.navigate(["/login"], {queryParams: {redirect_link: encodeURI(next.url)}});
        return false;

    }

    private findMatchUrl(menuItem:any, nextUrl:any, adminUser:any) {

        let valid = false;
        if ( nextUrl.includes(menuItem.link) ) {

            return menuItem.hasAccess(adminUser);

        }
        if ( menuItem.menu && menuItem.menu.length > 0 ) {

            for ( let item of menuItem.menu ) {

                valid = this.findMatchUrl(item, nextUrl, adminUser);
                if ( valid ) {

                    return item.hasAccess(adminUser);
                    break;

                }

            }

        }

        return false;

    }

}
