import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChannelSummaryResponse} from '../../../core/model/channel-response.model';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent {

  @Input() summary!: ChannelSummaryResponse;
  @Output() event: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

}
