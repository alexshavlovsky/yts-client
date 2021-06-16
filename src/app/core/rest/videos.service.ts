import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {VideoResponse, VideoSummaryResponse} from '../model/video-response.model';
import {QuerySpec} from '../model/query-spec.model';
import {VideoIdModel} from '../model/video-id-model';
import {ReadableResponse} from '../model/readable-response.model';
import {PagedSortedQuery} from '../table-connector/paged-sorted-filtering-query';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends AbstractPagedService<VideoResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PagedSortedQuery, staticQuery: QuerySpec): Observable<PagedResponse<VideoResponse>> {
    const params = pageableRequest.getHttpParams(staticQuery);
    return this.http.get<PagedResponse<VideoResponse>>('/api/videos', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

  getVideoSummary(id: string): Observable<VideoSummaryResponse> {
    return this.http.get<VideoSummaryResponse>('/api/videos/' + id, {headers: AbstractPagedService.ACCEPT_JSON});
  }

  updateVideo(payload: VideoIdModel): Observable<ReadableResponse> {
    return this.http.put<ReadableResponse>('/api/videos', payload, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  deleteById(id: string): Observable<ReadableResponse> {
    return this.http.delete<ReadableResponse>('/api/videos/' + id, {headers: AbstractPagedService.ACCEPT_JSON});
  }

}
