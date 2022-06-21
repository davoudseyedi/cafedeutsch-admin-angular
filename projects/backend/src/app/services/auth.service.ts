import { Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {

    constructor( private localStorageService: LocalStorageService ) { }

    public getAdmin() {
        return this.localStorageService.getItem('admin-data');
    }

    public setAdminToken(tokenData:any) {
        this.localStorageService.setItem('admin-token', tokenData);
    }

    public getAdminToken() {
        return this.localStorageService.getItem('admin-token');
    }

    public setAdmin(adminData:any) {
        this.localStorageService.setItem('admin-data', adminData);
    }

    public isAdmin() {
        return !!this.getAdmin();
    }

    public deleteAdmin() {
        this.localStorageService.removeItem('admin-data');
        this.localStorageService.removeItem('admin-token');
    }

    public logoutAdmin() {
        this.deleteAdmin();
    }

    // public checkProfilePermission(role='') {
    //
    //     let user = this.getUser();
    //
    //     if ( user && user.permissions && user.permissions.indexOf(role) > -1 ) {
    //
    //         return true;
    //
    //     } else {
    //
    //         return false;
    //
    //     }
    //
    // }

}
