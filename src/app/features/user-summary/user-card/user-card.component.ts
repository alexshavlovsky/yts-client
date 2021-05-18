import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserSummaryResponse} from '../../../core/model/user-response.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() summary!: UserSummaryResponse;
  @Output() event: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

}
