import {Component} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {ChannelsService} from '../../core/rest/channels.service';
import {CHANNEL_TABLE_PRESET} from '../../core/preset/rich-table.presets';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent {

  constructor(private channelsService: ChannelsService,
              private route: ActivatedRoute) {
  }

  activatedRoute = this.route;

  tableTitle = 'Channels';

  service = this.channelsService;

  columnsSpec: ColumnSpec[] = CHANNEL_TABLE_PRESET;

}
