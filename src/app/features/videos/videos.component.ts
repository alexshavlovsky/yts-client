import {Component} from '@angular/core';
import {ColumnSpec, DEF_CHANNEL_LINK_BUILDER, DEF_VIDEO_LINK_BUILDER} from '../../core/table-connector/column-spec';
import {VideosService} from '../../core/rest/videos.service';
import {DEF_CHANNEL_CTX_MENU_BUILDER, DEF_VIDEO_CTX_MENU_BUILDER} from '../../shared/rich-table/context-menu.data';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {

  constructor(private videosService: VideosService) {
  }

  tableTitle = 'Videos';

  service = this.videosService;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Channel',
      property: 'channelTitle',
      class: 'a-left flex2 nowrap',
      linkBuilder: DEF_CHANNEL_LINK_BUILDER,
      sortProperty: 'channel',
      ctxMenuBuilder: DEF_CHANNEL_CTX_MENU_BUILDER
    },
    {
      title: 'Title', property: 'title', class: 'a-left flex4', linkBuilder: DEF_VIDEO_LINK_BUILDER,
      ctxMenuBuilder: DEF_VIDEO_CTX_MENU_BUILDER
    },
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1 nowrap', sortProperty: 'publishedDate'},
    {title: 'View count', property: 'viewCountText', class: 'a-left flex1'},
    {title: 'Comment count', property: 'totalCommentCount', class: 'a-left flex1'},
    {title: 'Status', property: 'shortStatus', class: 'a-left flex1 nowrap', sortProperty: 'contextStatus_statusCode'},
  ];

}
