import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PagedSortedFilteringQuery} from './paged-sorted-filtering-query';
import {GenericPagedDataSource} from './generic-paged-data-source';
import {PageableRequest} from '../model/pageable-request';
import {QuerySpec} from '../model/query-spec.model';

@Injectable({
  providedIn: 'root'
})
export class MatTableConnectorService<T> {

  constructor() {
  }

  connect(paginator: MatPaginator, sort: MatSort, input: ElementRef,
          dataSource: GenericPagedDataSource<T>, staticQuery: QuerySpec): Observable<void> {
    return merge(
      of(true), // this value triggers initial data request
      paginator.page.pipe(map(_ => false)),
      sort.sortChange.pipe(map(_ => true)),
      fromEvent(input.nativeElement, 'input').pipe(map(_ => true)),
      fromEvent(input.nativeElement, 'keyup').pipe(map(_ => true)),
    ).pipe(
      debounceTime(500),
      map(resetPaginator => this.buildQuery(resetPaginator, paginator, sort, input)),
      distinctUntilChanged((a, b) =>
        a.pageIndex === b.pageIndex &&
        a.pageSize === b.pageSize &&
        a.sortProperty === b.sortProperty &&
        a.sortDirection === b.sortDirection &&
        a.filter === b.filter
      ),
      map(query => this.loadData(query, staticQuery, dataSource))
    );
  }

  buildQuery(resetPaginator: boolean, paginator: MatPaginator, sort: MatSort, input: ElementRef): PagedSortedFilteringQuery {
    const filter: string = input.nativeElement.value;
    const sortDirection: string = sort.direction;
    const doSort: boolean = sortDirection !== '';
    return {
      pageIndex: resetPaginator ? 0 : paginator.pageIndex,
      pageSize: paginator.pageSize,
      sortProperty: doSort ? sort.active : undefined,
      sortDirection: doSort ? sortDirection : undefined,
      filter
    };
  }

  loadData(query: PagedSortedFilteringQuery, staticQuery: QuerySpec, dataSource: GenericPagedDataSource<T>): void {
    dataSource.load(
      new PageableRequest(query.pageIndex, query.pageSize, query.sortProperty, query.sortDirection), {...staticQuery, text: query.filter}
    );
  }

}
