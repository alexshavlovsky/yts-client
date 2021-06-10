import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideosService} from '../../core/rest/videos.service';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';
import {ColumnSpec} from '../../core/preset/column-spec';
import {catchError, finalize} from 'rxjs/operators';
import {VideoSummaryResponse} from '../../core/model/video-response.model';
import {CommentsService} from '../../core/rest/comments.service';
import {VIDEO_COMMENTS_TABLE_PRESET} from '../../core/preset/rich-table.presets';
import {SnackBarService} from '../../core/snack-bar.service';

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
              private snackBarService: SnackBarService,
              private titleService: Title) {
//    console.log(this.route.snapshot.paramMap);
//    console.log(this.route.snapshot.queryParams);
  }

  readonly videoId = this.route.snapshot.paramMap.get('videoId');
  summary?: VideoSummaryResponse;

  service = this.commentsService;
  staticQuery: QuerySpec = this.videoId ? {videoId: this.videoId} : {};
  header = '';
  deleteButtonDisabled = false;

  columnsSpec: ColumnSpec[] = VIDEO_COMMENTS_TABLE_PRESET;

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
        catchError(err => this.snackBarService.showHttpError(err)),
        finalize(() => {
          this.deleteButtonDisabled = false;
          this.showSpinner = false;
        })
      ).subscribe(response => {
        this.snackBarService.showMessage(response.message);
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
        catchError(err => this.snackBarService.showHttpError(err)),
        finalize(() => this.showSpinner = false)
      ).subscribe(cs => {
        this.summary = cs;
        this.setHeaders(cs.video.title);
      });
    }
  }

}
