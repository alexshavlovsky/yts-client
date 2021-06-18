import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuerySpec} from '../model/query-spec.model';
import {HttpParams} from '@angular/common/http';

export interface RichTableRouterQueryParams extends Params {
  pageIndex?: string;
  pageSize?: string;
  sortProperty?: string;
  sortDirection?: string;
  text?: string;
}

export class PagedSortedQuery {

  constructor([pageIndex, pageSize]: number[], matSort: MatSort, text: string) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sort = SortSpec.fromMatSort(matSort);
    this.text = text;
  }

  private readonly pageIndex: number;
  private readonly pageSize: number;
  private readonly sort: SortSpec;
  private readonly text: string;

  static compare(a: PagedSortedQuery, b: PagedSortedQuery): boolean {
    return a.pageIndex === b.pageIndex &&
      a.pageSize === b.pageSize &&
      a.sort.equals(b.sort) &&
      a.text === b.text;
  }

  updateRouter(route: ActivatedRoute, router: Router, [defPageIndex, defPageSize]: number[]): void {
    if (!route) {
      return;
    }
    const params: RichTableRouterQueryParams = {};
    if (this.pageSize !== defPageSize || this.pageIndex !== defPageIndex) {
      params.pageIndex = this.pageIndex.toString();
      params.pageSize = this.pageSize.toString();
    }
    if (this.sort.active !== '') {
      params.sortProperty = this.sort.active;
      params.sortDirection = this.sort.direction;
    }
    if (this.text !== '') {
      params.text = this.text;
    }
    if (JSON.stringify(route.snapshot.queryParams) !== JSON.stringify(params)) {
      router.navigate(
        [],
        {
          relativeTo: route,
          queryParams: params
        });
    }
  }

  toHttpParams(staticQuery: QuerySpec): HttpParams {
    let httpParams = new HttpParams()
      .set('page', this.pageIndex.toString())
      .set('size', this.pageSize.toString());
    if (this.sort.direction !== '') {
      httpParams = httpParams.set('sort', this.sort.toHttpQueryParam());
    }
    if (this.text !== '') {
      httpParams = httpParams.set('text', this.text);
    }
    if (staticQuery) {
      for (const [param, value] of Object.entries(staticQuery)) {
        if (value && value !== '') {
          httpParams = httpParams.set(param, value);
        }
      }
    }
    return httpParams;
  }

}

export class SortSpec implements Sort {

  constructor(active: string, direction: SortDirection) {
    this.active = active;
    this.direction = direction;
  }

  static NO_SORT = new SortSpec('', '');

  readonly active: string;
  readonly direction: SortDirection;

  static compare(a: SortSpec, b: SortSpec): boolean {
    return a.active === b.active && a.direction === b.direction;
  }

  static fromMatSort(matSort: MatSort): SortSpec {
    const sortActive = matSort.active !== undefined && matSort.active !== ''
      && (matSort.direction === 'asc' || matSort.direction === 'desc');
    return sortActive ? new SortSpec(matSort.active, matSort.direction) : this.NO_SORT;
  }

  static fromParams(params: RichTableRouterQueryParams): SortSpec {
    return params.sortProperty !== undefined &&
    params.sortProperty !== '' &&
    params.sortDirection !== undefined &&
    (params.sortDirection === 'asc' || params.sortDirection === 'desc')
      ? new SortSpec(params.sortProperty, params.sortDirection) : this.NO_SORT;
  }

  toHttpQueryParam(): string {
    return this.active + ',' + this.direction;
  }

  public equals(s: SortSpec): boolean {
    return SortSpec.compare(this, s);
  }

  applyToMatSort(matSort: MatSort): void {
    const current = SortSpec.fromMatSort(matSort);
    if (!this.equals(current)) {
      if (this.active !== '' && this.direction !== '') {
        matSort.sort({id: this.active, start: this.direction, disableClear: false});
      } else {
        matSort.sort({id: '', start: 'asc', disableClear: false});
      }
    }
  }

}
