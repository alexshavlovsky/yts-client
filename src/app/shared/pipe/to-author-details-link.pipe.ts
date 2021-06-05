import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toAuthorDetailsLink'
})
export class ToAuthorDetailsLinkPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return 'users/' + value;
  }

}
