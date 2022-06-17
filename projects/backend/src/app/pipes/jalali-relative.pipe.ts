import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'jalali-moment';

@Pipe({
    name: 'jalaliRelative'
})
export class JalaliRelativePipe implements PipeTransform {
    transform(value: any, args?: any): any {

        if (!value) return '';

        let MomentDate = moment.from(value, 'en');

        if ( new Date(value) < new Date() )
        {
            return MomentDate.locale('en').fromNow(true) + ' ago';

        }else if(new Date(value) > new Date() ){

            return MomentDate.locale('en').fromNow(true) + ' مانده';

        }else{
            return MomentDate.locale('en').fromNow(false);
        }


    }
}
