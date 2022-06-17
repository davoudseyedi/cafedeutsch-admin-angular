import { Pipe, PipeTransform } from '@angular/core';
import { Config } from "../services/config";

@Pipe({name: 'badge'})

export class StatusPipe implements PipeTransform {

    private config:any = Config;

    transform(value: any, type:string): any {

        if ( this.config[type] && this.config[type].length > 0 ) {

            const match = this.config[type].filter((e:any) => e.id  == value );
            return match && match.length > 0 ? match[0].class : value;

        }

        return value;

    }
}
