import {ElementRef, Injectable} from '@angular/core';
import {EMPTY, fromEvent, merge, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PagedSortedFilteringQuery} from './paged-sorted-filtering-query';
import {GenericPagedDataSource} from './generic-paged-data-source';
import {PageableRequest} from '../model/pageable-request';
import {QuerySpec} from '../model/query-spec.model';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {flatMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class MatTableConnectorService<T> {

  constructor() {
  }

  connect(initialPagination: number[], route: ActivatedRoute, router: Router, paginator: MatPaginator, sort: MatSort, input: ElementRef,
          dataSource: GenericPagedDataSource<T>, staticQuery: QuerySpec): Observable<PagedSortedFilteringQuery> {
    return merge(
      of(initialPagination),
      paginator.page.pipe(map(_ => [paginator.pageIndex, paginator.pageSize])),
      sort.sortChange.pipe(map(_ => [0, paginator.pageSize])),
      fromEvent(input.nativeElement, 'input').pipe(map(_ => [0, paginator.pageSize])),
      fromEvent(input.nativeElement, 'keyup').pipe(map(_ => [0, paginator.pageSize])),
      router.events.pipe(
        filter(event => event instanceof NavigationStart && event.navigationTrigger === 'popstate'),
        flatMap(_ => {
          if (route) {
            // so far this is the simples way to make browser's back button function properly
            window.location.reload();
          }
          return EMPTY;
        })
      )
    ).pipe(
      debounceTime(500),
      map(pagination => this.buildQuery(pagination, sort, input)),
      distinctUntilChanged((a, b) =>
        a.pageIndex === b.pageIndex &&
        a.pageSize === b.pageSize &&
        a.sortProperty === b.sortProperty &&
        a.sortDirection === b.sortDirection &&
        a.filter === b.filter
      ),
      tap(query => this.loadData(query, staticQuery, dataSource))
    );
  }

  buildQuery(pagination: number[], sort: MatSort, input: ElementRef): PagedSortedFilteringQuery {
    const query: string = input.nativeElement.value;
    const sortDirection: string = sort.direction;
    const doSort: boolean = sortDirection !== '';
    return {
      pageIndex: pagination[0],
      pageSize: pagination[1],
      sortProperty: doSort ? sort.active : undefined,
      sortDirection: doSort ? sortDirection : undefined,
      filter: query
    };
  }

  loadData(query: PagedSortedFilteringQuery, staticQuery: QuerySpec, dataSource: GenericPagedDataSource<T>): void {
    dataSource.load(
      new PageableRequest(query.pageIndex, query.pageSize, query.sortProperty, query.sortDirection), {...staticQuery, text: query.filter}
    );
  }

}
