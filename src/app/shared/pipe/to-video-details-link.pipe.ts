import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toVideoDetailsLink'
})
export class ToVideoDetailsLinkPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return 'videos/' + value;
  }

}
