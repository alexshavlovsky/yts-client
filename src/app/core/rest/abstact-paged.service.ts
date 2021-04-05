import {PageableRequest} from '../model/pageable-request';
import {Observable} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {HttpHeaders} from '@angular/common/http';


export abstract class AbstractPagedService<T> {

  static ACCEPT_JSON = new HttpHeaders({Accept: 'application/json'});
  static CONTENT_JSON_ACCEPT_JSON = new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'});

  abstract find(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): Observable<PagedResponse<T>>;

}
