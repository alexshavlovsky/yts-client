import {Component} from '@angular/core';
import {CommentsService} from '../../core/rest/comments.service';
import {
  ColumnSpec,
  DEF_CHANNEL_LINK_BUILDER,
  DEF_COMMENT_BI_LINK_BUILDER,
  DEF_VIDEO_LINK_BUILDER
} from '../../core/table-connector/column-spec';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  constructor(private commentService: CommentsService) {
  }

  tableTitle = 'Comments';

  service = this.commentService;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Video',
      property: 'videoTitle',
      class: 'a-left flex2 nowrap',
      linkBuilder: DEF_VIDEO_LINK_BUILDER,
      sortProperty: 'video'
    },
    {title: 'Author', property: 'authorText', class: 'a-left flex2', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Comment', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
    {title: 'Likes', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1 nowrap', sortProperty: 'publishedDate'},
  ];

}
