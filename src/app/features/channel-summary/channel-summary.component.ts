import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {ChannelSummaryResponse} from '../../core/model/channel-response.model';
import {YT_CHANNEL_LINK_BUILDER_STRATEGY} from '../../core/table-connector/column-spec';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-channel-summary',
  templateUrl: './channel-summary.component.html',
  styleUrls: ['./channel-summary.component.css']
})
export class ChannelSummaryComponent implements OnInit {

  readonly channelId = this.route.snapshot.paramMap.get('channelId');
  summary?: ChannelSummaryResponse;
  link?: string;

  constructor(private route: ActivatedRoute,
              private channelsService: ChannelsService,
              private snackBar: MatSnackBar,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Channel summary');
    if (this.channelId) {
      const id = this.channelId;
      this.channelsService.getChannelSummary(id).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'close');
          return EMPTY;
        })
      ).subscribe(cs => {
        this.summary = cs;
        this.titleService.setTitle(cs.channel.title);
        this.link = YT_CHANNEL_LINK_BUILDER_STRATEGY(id);
      });
    }
  }

}
