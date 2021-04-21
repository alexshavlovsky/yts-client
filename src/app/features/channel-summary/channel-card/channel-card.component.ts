import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChannelSummaryResponse} from '../../../core/model/channel-response.model';
import {YT_CHANNEL_LINK_BUILDER_STRATEGY} from '../../../core/table-connector/column-spec';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent implements OnInit {

  @Input() summary!: ChannelSummaryResponse;
  @Output() event: EventEmitter<string> = new EventEmitter();
  link?: string;

  constructor() {
  }

  ngOnInit(): void {
    this.link = YT_CHANNEL_LINK_BUILDER_STRATEGY(this.summary.channel.channelId);
  }

}
