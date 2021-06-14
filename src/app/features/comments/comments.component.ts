import {Component} from '@angular/core';
import {CommentsService} from '../../core/rest/comments.service';
import {ColumnSpec} from '../../core/preset/column-spec';
import {COMMENT_TABLE_PRESET} from '../../core/preset/rich-table.presets';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  constructor(private commentService: CommentsService,
              private route: ActivatedRoute) {
  }

  activatedRoute = this.route;

  tableTitle = 'Comments';

  service = this.commentService;

  columnsSpec: ColumnSpec[] = COMMENT_TABLE_PRESET;

}
