import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {QuerySpec} from '../model/query-spec.model';
import {UserResponse, UserSummaryResponse} from '../model/user-response.model';
import {PagedSortedQuery} from '../table-connector/paged-sorted-filtering-query';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractPagedService<UserResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PagedSortedQuery, staticQuery: QuerySpec): Observable<PagedResponse<UserResponse>> {
    const params = pageableRequest.getHttpParams(staticQuery);
    return this.http.get<PagedResponse<UserResponse>>('/api/users', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

  getUserSummary(id: string): Observable<UserSummaryResponse> {
    return this.http.get<UserSummaryResponse>('/api/users/' + id, {headers: AbstractPagedService.ACCEPT_JSON});
  }

}
