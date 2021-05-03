import {Component} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {UsersService} from '../../core/rest/users.service';
import {AUTHOR_TABLE_PRESET} from '../../core/preset/rich-table.presets';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private usersService: UsersService) {
  }

  tableTitle = 'Authors';

  service = this.usersService;

  columnsSpec: ColumnSpec[] = AUTHOR_TABLE_PRESET;

}
