import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getAttribute' })

export class GetAttributePipe implements PipeTransform {

    transform(value:any, fieldName: string): any {

       if ( !value || value.length == 0 )
       {
           return '';
       }

       for ( let item of value )
       {
           if ( item.key == fieldName )
           {
               return item.value;
           }
       }

        return '';

    }

}
