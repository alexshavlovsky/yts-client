import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {VideoResponse, VideoSummaryResponse} from '../model/video-response.model';
import {QuerySpec} from '../model/query-spec.model';
import {delay} from 'rxjs/operators';
import {VideoIdModel} from '../model/video-id-model';
import {flatMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends AbstractPagedService<VideoResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PageableRequest, query: QuerySpec): Observable<PagedResponse<VideoResponse>> {
    const params = pageableRequest.getHttpParams(query);
    return this.http.get<PagedResponse<VideoResponse>>('/api/videos', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

  getVideoSummary(id: string): Observable<VideoSummaryResponse> {
    return this.http.get<VideoSummaryResponse>('/api/videos/' + id, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  deleteById(id: string): Observable<VideoIdModel> {
    // TODO implement this
    return of('not implemented').pipe(
      delay(1000),
      flatMap(msg => throwError({message: msg}))
    );
  }

}
