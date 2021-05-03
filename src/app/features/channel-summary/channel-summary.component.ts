import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {ChannelSummaryResponse} from '../../core/model/channel-response.model';
import {ColumnSpec} from '../../core/preset/column-spec';
import {catchError, finalize} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {VideosService} from '../../core/rest/videos.service';
import {QuerySpec} from '../../core/model/query-spec.model';
import {CHANNEL_VIDEOS_TABLE_PRESET} from '../../core/preset/rich-table.presets';

@Component({
  selector: 'app-channel-summary',
  templateUrl: './channel-summary.component.html',
  styleUrls: ['./channel-summary.component.css', '../../shared/rich-table/rich-table.component.css']
})
export class ChannelSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private channelsService: ChannelsService,
              private videosService: VideosService,
              private snackBar: MatSnackBar,
              private titleService: Title) {
  }

  readonly channelId = this.route.snapshot.paramMap.get('channelId');
  summary?: ChannelSummaryResponse;

  service = this.videosService;
  staticQuery: QuerySpec = this.channelId ? {channelId: this.channelId} : {};
  header = '';
  deleteButtonDisabled = false;

  columnsSpec: ColumnSpec[] = CHANNEL_VIDEOS_TABLE_PRESET;

  showSpinner = false;

  setHeaders(value: string): void {
    this.header = value;
    this.titleService.setTitle(value);
  }

  ngOnInit(): void {
    this.setHeaders('Channel summary');
    this.loadSummary();
  }

  deleteChannel(): void {
    if (this.channelId) {
      const id = this.channelId;
      this.deleteButtonDisabled = true;
      this.showSpinner = true;
      this.channelsService.deleteById(id).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'close');
          return EMPTY;
        }),
        finalize(() => {
          this.deleteButtonDisabled = false;
          this.showSpinner = false;
        })
      ).subscribe(response => {
        this.snackBar.open(`Channel ${response.channelId} deleted`, 'close');
        this.router.navigate(['/channels']);
      });
    }
  }

  channelCardEvent($event: string): void {
    if ($event === 'refresh') {
      this.loadSummary();
    }
  }

  private loadSummary(): void {
    if (this.channelId) {
      const id = this.channelId;
      this.showSpinner = true;
      this.channelsService.getChannelSummary(id).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'close');
          return EMPTY;
        }),
        finalize(() => this.showSpinner = false)
      ).subscribe(cs => {
        this.summary = cs;
        this.setHeaders(cs.channel.title);
      });
    }
  }

}
