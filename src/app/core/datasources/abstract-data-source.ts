import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {PageableRequest} from '../model/pageable-request';

export abstract class AbstractDataSource<T> implements DataSource<T> {

  protected static EMPTY_PAGE: PagedResponse<any> = {
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };

  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected contextSubject = new BehaviorSubject<PagedResponse<T>>(AbstractDataSource.EMPTY_PAGE);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected errorSubject = new Subject<string>();
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

  abstract load(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): void;
}
