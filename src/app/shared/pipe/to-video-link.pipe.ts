import {Pipe, PipeTransform} from '@angular/core';
import {YT_VIDEO_LINK_BUILDER_STRATEGY} from '../../core/preset/link-builder.presets';

@Pipe({
  name: 'toVideoLink'
})
export class ToVideoLinkPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return YT_VIDEO_LINK_BUILDER_STRATEGY(value);
  }

}
