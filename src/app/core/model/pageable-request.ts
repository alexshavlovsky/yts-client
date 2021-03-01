import {HttpParams} from '@angular/common/http';

export class PageableRequest {
  private readonly page: number;
  private readonly size: number;
  private readonly sortProperty: string | undefined;
  private readonly sortDirection: string | undefined;

  constructor(page: number = 0, size: number = 10, sortProperty?: string, sortDirection?: string) {
    this.sortProperty = sortProperty;
    this.sortDirection = sortDirection;
    this.page = page;
    this.size = size;
  }

  getHttpParams(params?: { [param: string]: string }): HttpParams {
    let httpParams = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.size.toString());
    if (this.sortProperty && this.sortDirection && (this.sortDirection === 'asc' || this.sortDirection === 'desc')) {
      httpParams = httpParams.set('sort', this.sortProperty + ',' + this.sortDirection);
    }
    if (params) {
      for (const [param, value] of Object.entries(params)) {
        if (value && value !== '') {
          httpParams = httpParams.set(param, value);
        }
      }
    }
    return httpParams;
  }

}
