import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {CommentResponse} from '../model/comment-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {QuerySpec} from '../model/query-spec.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends AbstractPagedService<CommentResponse> {

  constructor(private http: HttpClient) {
    super();
  }

//  GET /api/comments?text=book&page=0&size=5&sort=authorText,asc
//  Accept: application/json
  find(pageableRequest: PageableRequest, query: QuerySpec): Observable<PagedResponse<CommentResponse>> {
    const params = pageableRequest.getHttpParams(query);
    return this.http.get<PagedResponse<CommentResponse>>('/api/comments', {params, headers: AbstractPagedService.ACCEPT_JSON});
  }

}
