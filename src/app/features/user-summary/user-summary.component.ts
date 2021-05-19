import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '../../core/snack-bar.service';
import {Title} from '@angular/platform-browser';
import {UserSummaryResponse} from '../../core/model/user-response.model';
import {UsersService} from '../../core/rest/users.service';
import {catchError, finalize} from 'rxjs/operators';
import {CommentsService} from '../../core/rest/comments.service';
import {ColumnSpec} from '../../core/preset/column-spec';
import {USER_COMMENTS_TABLE_PRESET} from '../../core/preset/rich-table.presets';
import {QuerySpec} from '../../core/model/query-spec.model';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css', '../../shared/rich-table/rich-table.component.css']
})
export class UserSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usersService: UsersService,
              private commentsService: CommentsService,
              private snackBarService: SnackBarService,
              private titleService: Title) {
  }

  readonly userId = this.route.snapshot.paramMap.get('userId');
  summary?: UserSummaryResponse;
  header = '';
  showSpinner = false;

  service = this.commentsService;
  staticQuery: QuerySpec = this.userId ? {authorChannel: this.userId} : {};
  columnsSpec: ColumnSpec[] = USER_COMMENTS_TABLE_PRESET;

  setHeaders(value: string): void {
    this.header = value;
    this.titleService.setTitle(value);
  }

  ngOnInit(): void {
    this.setHeaders('Author summary');
    this.loadSummary();
  }

  private loadSummary(): void {
    if (this.userId) {
      const id = this.userId;
      this.showSpinner = true;
      this.usersService.getUserSummary(id).pipe(
        catchError(err => this.snackBarService.showHttpError(err)),
        finalize(() => this.showSpinner = false)
      ).subscribe(us => {
        this.summary = us;
        this.setHeaders(us.authorText);
      });
    }
  }

  userCardEvent($event: string): void {
    if ($event === 'refresh') {
      this.loadSummary();
    }
  }

}
