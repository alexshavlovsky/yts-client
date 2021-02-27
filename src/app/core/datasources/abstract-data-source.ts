import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {PageableRequest} from '../model/pageable-request';

export abstract class AbstractDataSource<T> implements DataSource<T> {

  protected static empty: PagedResponse<any> = {
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  };

  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected contextSubject = new BehaviorSubject<PagedResponse<T>>(AbstractDataSource.empty);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

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
