import {Component} from '@angular/core';
import {ColumnSpec, DEF_AUTHOR_LINK_BUILDER} from '../../core/table-connector/column-spec';
import {UsersService} from '../../core/rest/users.service';
import {DEF_AUTHOR_CTX_MENU_BUILDER} from '../../shared/rich-table/context-menu.data';

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
      property: 'authorText',
      class: 'a-left flex4 nowrap',
      linkBuilder: DEF_AUTHOR_LINK_BUILDER,
      ctxMenuBuilder: DEF_AUTHOR_CTX_MENU_BUILDER
    },
    {title: 'Commented video count', property: 'commentedVideoCount', class: 'a-left flex1'},
    {title: 'Comment count', property: 'commentCount', class: 'a-left flex1'},
    {title: 'Like count', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Reply count', property: 'replyCount', class: 'a-left flex1'},
    {title: 'First seen', property: 'firstSeen', class: 'a-left flex2', formatDate: true},
    {title: 'Last seen', property: 'lastSeen', class: 'a-left flex2', formatDate: true},
  ];

}
