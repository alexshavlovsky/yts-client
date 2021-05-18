import {Pipe, PipeTransform} from '@angular/core';
import {YT_CHANNEL_LINK_BUILDER_STRATEGY} from '../../core/preset/link-builder.presets';

@Pipe({
  name: 'toChannelLink'
})
export class ToChannelLinkPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return YT_CHANNEL_LINK_BUILDER_STRATEGY(value);
  }

}
