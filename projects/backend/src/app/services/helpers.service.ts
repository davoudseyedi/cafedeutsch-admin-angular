import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, Location} from "@angular/common";
// import * as moment from 'jalali-moment';
import { AdminApiService } from "./api.service";
import { AlertService } from "./alert.service";
import { ReplaySubject } from "rxjs";
import {last} from "rxjs/operators";

@Injectable()
export class HelpersService {

    constructor(private location: Location,
                private apiService: AdminApiService,
                @Inject(PLATFORM_ID) private platformId: Object,
                private alertService: AlertService) { }

    /**
     * This method will prepare query params from array of input.
     * ! Params is an object and any key must has array value.
     *
     * @param params
     */
    public makeQueryParam(params: any) {

        let urlParams: any[] = [];

        for ( let key in params ) {
            if ( params[key] && params[key].length > 0 ) {
                if (typeof params[key] == 'object') {
                    urlParams.push(key + "=" + params[key].join(","));
                } else {
                    urlParams.push(key + "=" + params[key]);
                }
            }
        }

        let queryString = urlParams.length > 0 ? "?" + urlParams.join("&") : "";

        if ( queryString.length > 0 ) {
            return queryString;
        }
        return "";
    }

    /**
     * This method will change route params.
     * ! Route is required.
     * ! Params is an object and any key must has array value.
     * @param route
     * @param params
     */
    public changeRouteParams(route:any, params: any) {

      let queryString = this.makeQueryParam(params);
      if ( queryString.length > 0 ) {
          let url = route + queryString;
          this.location.go(url);
          return true;
      } else {
        return false
      }

    }

    /**
     * This method will create slug to use in routes.
     *
     * @param name
     */
    public createSlug(name:any) {
        if ( !name ) {
            return 'not-valid';
        }
        return name
            .replace(/\s+/g, "-")
            .replace(/[0-9]/gi, "-")
            .replace(/\//g, "-")
            .replace(/\\/g, "-")
            .replace(/\\/g, "-")
            .replace(/[)(_;:|,.&*%]/g, "-")
            .replace(/-$/g, "")
            .replace(/^-/g, "")
            .replace(/\-\-/gi, " ")
            .replace(/\s+/g, "-");
    }

    public handleResponseError(error:any, formError:any, defaultField = 'name') {

        if ( error.statusCode !== 422 && error.message ) {
            formError[defaultField] = error.message;
            return false;
        } else if ( error.statusCode == 422 && error.message ) {

            for ( let key in formError ) {

                if ( error.message[key] && error.message[key].length > 0 ) {
                    formError[key] = error.message[key][0];
                }

            }

        }
      return false;
    }

    /**
     *
     * @param date
     * @param time
     * @returns {string}
     */
    // public convertToMiladi(date:any, time = false) {
    //
    //     if ( !date ) return null;
    //
    //     if ( time ) {
    //
    //         // return moment(date, 'jYYYY-jMM-jDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    //
    //     } else {
    //
    //         // return moment(date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
    //
    //     }
    //
    // }

    /**
     *
     * @param date
     * @param time
     * @param type
     * @returns {string}
     */
    // public convertToJalali(date:any, time = false,type:string= '') {
    //
    //     if ( !date ) return null;
    //
    //     if ( time ) {
    //
    //         // return moment(date, 'YYYY-MM-DD HH:mm:ss').format('jYYYY-jMM-jDD HH:mm:ss');
    //
    //     } else {
    //
    //         if(type == 'month'){
    //             // return moment(date, 'MMMM').format('jMMMM');
    //         }else{
    //             // return moment(date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
    //         }
    //
    //
    //     }
    //
    // }

    /**
     *
     * @param type = 'bar', 'pie', 'line'
     * @param labels
     * @param data
     * @param colors
     * @param options
     */
    public createChart( type= 'bar',
                        labels: any[] = [],
                        data: any = null,
                        colors: any[] = ["#213368", "#26a9e0","#0a1f44","#FBB615"],
                        options: any = {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: ''
                            }
                        } ) {


        let dataset = [];

        for ( let key in data ) {

            dataset.push({
                label: key,
                backgroundColor: colors,
                data: data[key]
            })

        }

        return {
                type: type,
                data: {
                    labels: labels,
                    datasets: dataset
                },
                options: options
            }

    }

}
