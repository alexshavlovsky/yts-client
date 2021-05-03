import {Component} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {ChannelsService} from '../../core/rest/channels.service';
import {CHANNEL_TABLE_PRESET} from '../../core/preset/rich-table.presets';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent {

  constructor(private channelsService: ChannelsService) {
  }

  tableTitle = 'Channels';

  service = this.channelsService;

  columnsSpec: ColumnSpec[] = CHANNEL_TABLE_PRESET;

}
