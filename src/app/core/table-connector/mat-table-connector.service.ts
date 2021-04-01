import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PagedSortedFilteringQuery} from './paged-sorted-filtering-query';
import {AbstractDataSource} from '../datasources/abstract-data-source';
import {PageableRequest} from '../model/pageable-request';

@Injectable({
  providedIn: 'root'
})
export class MatTableConnectorService {

  constructor() {
  }

  connect(paginator: MatPaginator, sort: MatSort, input: ElementRef,
          dataSource: AbstractDataSource<any>): Observable<void> {
    return merge(
      of(true), // this value triggers initial data request
      paginator.page.pipe(map(_ => false)),
      sort.sortChange.pipe(map(_ => true)),
      fromEvent(input.nativeElement, 'change').pipe(map(_ => true)),
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
      map(query => this.loadData(query, dataSource))
    );
  }

  buildQuery(resetPaginator: boolean, paginator: MatPaginator, sort: MatSort, input: ElementRef): PagedSortedFilteringQuery {
    const filter: string = input.nativeElement.value;
    console.log(filter);
    const doFilter: boolean = filter.length > 0;
    const sortDirection: string = sort.direction;
    const doSort: boolean = (sortDirection !== '') && doFilter;
    return {
      pageIndex: resetPaginator ? 0 : paginator.pageIndex,
      pageSize: paginator.pageSize,
      sortProperty: doSort ? sort.active : undefined,
      sortDirection: doSort ? sortDirection : undefined,
      filter
    };
  }

  loadData(query: PagedSortedFilteringQuery, dataSource: AbstractDataSource<any>): void {
    dataSource.load(
      new PageableRequest(query.pageIndex, query.pageSize, query.sortProperty, query.sortDirection), {text: query.filter}
    );
  }

}
