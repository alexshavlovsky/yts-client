import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {ChannelSummaryResponse} from '../../core/model/channel-response.model';
import {ColumnSpec, DEF_VIDEO_LINK_BUILDER} from '../../core/table-connector/column-spec';
import {catchError, finalize} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {VideosService} from '../../core/rest/videos.service';
import {QuerySpec} from '../../core/model/query-spec.model';
import {DEF_VIDEO_CTX_MENU_BUILDER} from '../../shared/rich-table/context-menu.data';

@Component({
  selector: 'app-channel-summary',
  templateUrl: './channel-summary.component.html',
  styleUrls: ['./channel-summary.component.css']
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

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Title',
      property: 'title',
      class: 'a-left flex4',
      linkBuilder: DEF_VIDEO_LINK_BUILDER,
      ctxMenuBuilder: DEF_VIDEO_CTX_MENU_BUILDER
    },
    {title: 'Published', property: 'publishedTimeText', class: 'a-right flex1', sortProperty: 'publishedDate'},
    {title: 'View count', property: 'viewCountText', class: 'a-right flex1'},
    {title: 'Comment count', property: 'totalCommentCount', class: 'a-right flex1'},
    {title: 'Status', property: 'shortStatus', class: 'a-center flex1', sortProperty: 'contextStatus_statusCode'},
  ];

  showSpinner = false;

  setHeaders(value: string): void {
    this.header = value;
    this.titleService.setTitle(value);
  }

  ngOnInit(): void {
    this.setHeaders('Channel summary');
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

}
