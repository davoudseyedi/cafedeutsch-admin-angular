import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Injectable()

/**
 * This class is an interface for `ngx-toaster`.
 */
export class AlertService {

    constructor( private toastr: ToastrService,
                 @Inject(PLATFORM_ID) private platformId: Object ) {}

    /**
     * Pop toast alert type normal.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alert(alertMsg:any, alertTitle = '') {
        if ( isPlatformBrowser(this.platformId) ) {
            let option: any = {
                closeButton: true,
                progressBar: true,
            };
            this.toastr.info(alertMsg, alertTitle, option);
        }
    }

    /**
     * Pop toast alert type success.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertSuccess(alertMsg:any, alertTitle = '') {
        if ( isPlatformBrowser(this.platformId) ) {
            let option: any = {
                closeButton: true,
                progressBar: true,
            };
            this.toastr.success(alertMsg, alertTitle, option);
        }
    }

    /**
     * Pop toast alert type error.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertError(alertMsg:any, alertTitle = '') {
        if ( isPlatformBrowser(this.platformId) ) {
            let option: any = {
                closeButton: true,
                progressBar: true,
            };
            this.toastr.error(alertMsg, alertTitle, option);
        }
    }

    /**
     * Pop toast alert type warning.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertWarn(alertMsg:any, alertTitle = '') {
        if ( isPlatformBrowser(this.platformId) ) {
            let option: any = {
                closeButton: true,
                progressBar: true,
            };
            this.toastr.warning(alertMsg, alertTitle, option);
        }
    }

    /**
     * Clear all toasts.
     */
    public clearAlerts() {
        if ( isPlatformBrowser(this.platformId) ) {
            this.toastr.clear();
        }
    }

}
