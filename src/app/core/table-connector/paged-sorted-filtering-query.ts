import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuerySpec} from '../model/query-spec.model';
import {HttpParams} from '@angular/common/http';

export class PagedSortedQuery {

  constructor([pageIndex, pageSize]: number[], matSort: MatSort, text: string) {
    const sort = PagedSortedQuery.getSortFromMatSort(matSort);
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortProperty = sort.active;
    this.sortDirection = sort.direction;
    this.text = text;
  }

  private readonly pageIndex: number;
  private readonly pageSize: number;
  private readonly sortProperty: string;
  private readonly sortDirection: SortDirection;
  private readonly text: string;

  static compare = (a: PagedSortedQuery, b: PagedSortedQuery): boolean =>
    a.pageIndex === b.pageIndex &&
    a.pageSize === b.pageSize &&
    a.sortProperty === b.sortProperty &&
    a.sortDirection === b.sortDirection &&
    a.text === b.text

  static getSortFromMatSort(sort: MatSort): Sort {
    const sortActive = sort.active !== undefined && sort.active !== '' && (sort.direction === 'asc' || sort.direction === 'desc');
    return sortActive ? {active: sort.active, direction: sort.direction} : {active: '', direction: ''};
  }

  static getSortFromParams(params: Params): Sort {
    const sortActive = params.sortProperty !== undefined && params.sortProperty !== '' &&
      params.sortDirection !== undefined && (params.sortDirection === 'asc' || params.sortDirection === 'desc');
    return sortActive ? {active: params.sortProperty, direction: params.sortDirection} : {active: '', direction: ''};
  }

  updateRouter(route: ActivatedRoute, router: Router, [defPageIndex, defPageSize]: number[]): void {
    if (!route) {
      return;
    }
    const params: Params = {...this};
    if (params.pageSize === defPageSize && params.pageIndex === defPageIndex) {
      delete params.pageSize;
      delete params.pageIndex;
    }
    if (params.sortProperty === '') {
      delete params.sortProperty;
      delete params.sortDirection;
    }
    if (params.text === '') {
      delete params.text;
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

  getHttpParams(staticQuery: QuerySpec): HttpParams {
    let httpParams = new HttpParams()
      .set('page', this.pageIndex.toString())
      .set('size', this.pageSize.toString());
    if (this.sortProperty !== '') {
      httpParams = httpParams.set('sort', this.sortProperty + ',' + this.sortDirection);
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
