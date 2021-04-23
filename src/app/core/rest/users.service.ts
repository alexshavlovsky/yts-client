import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {QuerySpec} from '../model/query-spec.model';
import {UserResponse} from '../model/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractPagedService<UserResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PageableRequest, query: QuerySpec): Observable<PagedResponse<UserResponse>> {
    const params = pageableRequest.getHttpParams(query);
    return this.http.get<PagedResponse<UserResponse>>('/api/users', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

}
