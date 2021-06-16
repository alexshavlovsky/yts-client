import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PagedSortedQuery} from './paged-sorted-filtering-query';

@Injectable({
  providedIn: 'root'
})
export class MatTableConnectorService<T> {

  constructor() {
  }

  connect(parentPaginationEvents: Observable<number[]>,
          paginator: MatPaginator, sort: MatSort, input: ElementRef): Observable<PagedSortedQuery> {
    return merge(
      parentPaginationEvents,
      paginator.page.pipe(map(_ => [paginator.pageIndex, paginator.pageSize])),
      sort.sortChange.pipe(map(_ => [0, paginator.pageSize])),
      fromEvent(input.nativeElement, 'input').pipe(map(_ => [0, paginator.pageSize])),
      fromEvent(input.nativeElement, 'keyup').pipe(map(_ => [0, paginator.pageSize])),
    ).pipe(
      debounceTime(500),
      map(pagination => new PagedSortedQuery(pagination, sort, input.nativeElement.value)),
      distinctUntilChanged(PagedSortedQuery.compare)
    );
  }

}
