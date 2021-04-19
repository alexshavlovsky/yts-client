import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {ChannelResponse, ChannelSummaryResponse} from '../model/channel-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {ChannelIdModel} from '../model/channel-id-model';
import {QuerySpec} from '../model/query-spec.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService extends AbstractPagedService<ChannelResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PageableRequest, query: QuerySpec): Observable<PagedResponse<ChannelResponse>> {
    const params = pageableRequest.getHttpParams(query);
    return this.http.get<PagedResponse<ChannelResponse>>('/api/channels', {params, headers: AbstractPagedService.ACCEPT_JSON});
  }

  addChannel(payload: ChannelIdModel): Observable<ChannelIdModel> {
    return this.http.post<ChannelIdModel>('/api/channels', payload, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  getChannelSummary(id: string): Observable<ChannelSummaryResponse> {
    return this.http.get<ChannelSummaryResponse>('/api/channels/' + id, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  deleteById(id: string): Observable<ChannelIdModel> {
    return this.http.delete<ChannelIdModel>('/api/channels/' + id, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

}
