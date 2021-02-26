import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentResponse} from './comment-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  find(commentId: string, filter = '', sortOrder = 'asc',
       pageNumber = 0, pageSize = 3): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>('/api/comments', {
      params: new HttpParams()
        .set('courseId', commentId)
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }
}
