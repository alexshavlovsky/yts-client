import {AbstractDataSource} from './abstract-data-source';
import {catchError, finalize} from 'rxjs/operators';
import {CommentResponse} from '../model/comment-response.model';
import {CommentsService} from '../rest/comments.service';
import {PageableRequest} from '../model/pageable-request';
import {of} from 'rxjs';

export class CommentsDataSource extends AbstractDataSource<CommentResponse> {

  constructor(private commentsService: CommentsService) {
    super();
  }

  load(pageableRequest: PageableRequest, filter?: { [p: string]: string }): void {
    this.loadingSubject.next(true);
    this.commentsService.find(pageableRequest, filter).pipe(
      catchError(error => {
        this.errorSubject.next(error.message);
        return of(AbstractDataSource.EMPTY_PAGE);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(response => {
      this.contextSubject.next(response);
      this.dataSubject.next(response.content);
    });
  }

}
