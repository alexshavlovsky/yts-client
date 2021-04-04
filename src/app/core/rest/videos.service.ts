import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {VideoResponse} from '../model/video-response.model';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends AbstractPagedService<VideoResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): Observable<PagedResponse<VideoResponse>> {
    const params = pageableRequest.getHttpParams(filter);
    return this.http.get<PagedResponse<VideoResponse>>('/api/videos', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

}
