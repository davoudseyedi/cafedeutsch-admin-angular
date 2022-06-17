import { Pipe, PipeTransform } from '@angular/core';
import { HelpersService } from "../services/helpers.service";
import { ReplaySubject } from "rxjs";

@Pipe({
    name: 'file'
})

export class DynamicFilePipe implements PipeTransform {

    constructor( private helperService: HelpersService ) {
    }

    transform(value: any): any {

        let observable: ReplaySubject<any> = new ReplaySubject();

        if ( !value || ( value && !value.length ) ) {

            return '';

        } else {

            this.helperService.loadFile(value).subscribe(url => {

                return observable.next(url);

            });

        }

        return observable;

    }

}
