import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideosService} from '../../core/rest/videos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';
import {ColumnSpec, DEF_AUTHOR_LINK_BUILDER, DEF_COMMENT_BI_LINK_BUILDER} from '../../core/table-connector/column-spec';
import {catchError, finalize} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {VideoSummaryResponse} from '../../core/model/video-response.model';
import {CommentsService} from '../../core/rest/comments.service';
import {DEF_AUTHOR_CTX_MENU_BUILDER} from '../../shared/rich-table/context-menu.data';

@Component({
  selector: 'app-video-summary',
  templateUrl: './video-summary.component.html',
  styleUrls: ['./video-summary.component.css', '../../shared/rich-table/rich-table.component.css']
})
export class VideoSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private videosService: VideosService,
              private commentsService: CommentsService,
              private snackBar: MatSnackBar,
              private titleService: Title) {
  }

  readonly videoId = this.route.snapshot.paramMap.get('videoId');
  summary?: VideoSummaryResponse;

  service = this.commentsService;
  staticQuery: QuerySpec = this.videoId ? {videoId: this.videoId} : {};
  header = '';
  deleteButtonDisabled = false;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Author', property: 'authorText', class: 'a-left flex2', linkBuilder: DEF_AUTHOR_LINK_BUILDER,
      ctxMenuBuilder: DEF_AUTHOR_CTX_MENU_BUILDER
    },
    {title: 'Comment', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
    {title: 'Likes', property: 'likeCount', class: 'a-right flex1'},
    {title: 'Published', property: 'publishedTimeText', class: 'a-right flex1', sortProperty: 'publishedDate'},
  ];

  showSpinner = false;

  setHeaders(value: string): void {
    this.header = value;
    this.titleService.setTitle(value);
  }

  ngOnInit(): void {
    this.setHeaders('Video summary');
    this.loadSummary();
  }

  deleteChannel(): void {
    if (this.videoId) {
      const id = this.videoId;
      this.deleteButtonDisabled = true;
      this.showSpinner = true;
      this.videosService.deleteById(id).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'close');
          return EMPTY;
        }),
        finalize(() => {
          this.deleteButtonDisabled = false;
          this.showSpinner = false;
        })
      ).subscribe(response => {
        this.snackBar.open(`Video ${response.videoId} deleted`, 'close');
        this.router.navigate(['/videos']);
      });
    }
  }

  videoCardEvent($event: string): void {
    if ($event === 'refresh') {
      this.loadSummary();
    }
  }

  private loadSummary(): void {
    if (this.videoId) {
      const id = this.videoId;
      this.showSpinner = true;
      this.videosService.getVideoSummary(id).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'close');
          return EMPTY;
        }),
        finalize(() => this.showSpinner = false)
      ).subscribe(cs => {
        this.summary = cs;
        this.setHeaders(cs.video.title);
      });
    }
  }

}
