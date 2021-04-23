import {Component} from '@angular/core';
import {ColumnSpec, YT_CHANNEL_LINK_BUILDER_STRATEGY} from '../../core/table-connector/column-spec';
import {UsersService} from '../../core/rest/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private usersService: UsersService) {
  }

  tableTitle = 'Users';

  service = this.usersService;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Title',
      property: 'userTitle',
      class: 'a-left flex4 nowrap',
      linkBuilder: {idKey: 'userId', builder: YT_CHANNEL_LINK_BUILDER_STRATEGY}
    },
    {title: 'Commented video count', property: 'commentedVideoCount', class: 'a-left flex1'},
    {title: 'Comment count', property: 'commentCount', class: 'a-left flex1'},
    {title: 'Like count', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Reply count', property: 'replyCount', class: 'a-left flex1'},
  ];

}
