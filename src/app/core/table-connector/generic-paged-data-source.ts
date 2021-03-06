import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractPagedService} from '../rest/abstact-paged.service';
import {QuerySpec} from '../model/query-spec.model';
import {PagedSortedQuery} from './paged-sorted-filtering-query';

export class GenericPagedDataSource<T> implements DataSource<T> {

  constructor(private pagedService: AbstractPagedService<T> | null) {
  }

  protected static EMPTY_PAGE: PagedResponse<any> = {
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };

  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected contextSubject = new BehaviorSubject<PagedResponse<T>>(GenericPagedDataSource.EMPTY_PAGE);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected errorSubject = new Subject<any>();
  public loading$ = this.loadingSubject.asObservable();
  public context$ = this.contextSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.contextSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageableRequest: PagedSortedQuery, staticQuery: QuerySpec): void {
    if (this.pagedService == null) {
      return;
    }
    this.loadingSubject.next(true);
    this.pagedService.find(pageableRequest, staticQuery).pipe(
      catchError(error => {
        this.errorSubject.next(error);
        return of(GenericPagedDataSource.EMPTY_PAGE);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(response => {
      this.contextSubject.next(response);
      this.dataSubject.next(response.content);
    });
  }

}
