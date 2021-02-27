import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {CommentResponse} from '../model/comment-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  static ACCEPT_JSON = new HttpHeaders({Accept: 'application/json'});

//  GET /api/comments?text=book&page=0&size=5&sort=authorText,asc
//  Accept: application/json
  find(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): Observable<PagedResponse<CommentResponse>> {
    const params = pageableRequest.getHttpParams(filter);
    return this.http.get<PagedResponse<CommentResponse>>('/api/comments', {params, headers: CommentsService.ACCEPT_JSON});
  }

}
