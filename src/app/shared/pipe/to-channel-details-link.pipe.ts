import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toChannelDetailsLink'
})
export class ToChannelDetailsLinkPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return 'channels/' + value;
  }

}
