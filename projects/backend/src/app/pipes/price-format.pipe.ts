import {Pipe, PipeTransform} from '@angular/core';
/*
 * Converts newlines into html breaks
 */
@Pipe({ name: 'priceformat' })
export class PriceFormatPipe implements PipeTransform {
    transform(value: any, cur = 'rial'): any {
        if ( !value ) return 0;
        let exactPrice = (value/(cur == 'rial' ? 10 : 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return exactPrice.split('.')[0];
    }
}
