import {Component} from '@angular/core';
import {ColumnSpec, DEF_CHANNEL_LINK_BUILDER} from '../../core/table-connector/column-spec';
import {ChannelsService} from '../../core/rest/channels.service';
import {DEF_CHANNEL_CTX_MENU_BUILDER} from '../../shared/rich-table/context-menu.data';

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

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Vanity name',
      property: 'channelVanityName',
      class: 'a-left flex4',
      linkBuilder: DEF_CHANNEL_LINK_BUILDER,
      ctxMenuBuilder: DEF_CHANNEL_CTX_MENU_BUILDER
    },
    {title: 'Title', property: 'title', class: 'a-left flex4', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Video count', property: 'videoCount', class: 'a-left flex1'},
    {title: 'Subscribers', property: 'subscriberCount', class: 'a-left flex1'},
    // TODO refactor the content alignment of a column so that it does not apply to a table header
    {title: 'Status', property: 'shortStatus', class: 'a-left flex1 nowrap', sortProperty: 'contextStatus_statusCode'},
  ];

}
