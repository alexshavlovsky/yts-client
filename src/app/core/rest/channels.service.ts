import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagedResponse} from '../model/paged-response.model';
import {ChannelResponse, ChannelSummaryResponse} from '../model/channel-response.model';
import {AbstractPagedService} from './abstact-paged.service';
import {QuerySpec} from '../model/query-spec.model';
import {ReadableResponse} from '../model/readable-response.model';
import {PagedSortedQuery} from '../table-connector/paged-sorted-filtering-query';
import {ChannelDialogPayload} from '../../shared/corner-menu/add-channel-dialog/add-channel-dialog.component';
import {ChannelIdModel} from '../model/channel-id-model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService extends AbstractPagedService<ChannelResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PagedSortedQuery, staticQuery: QuerySpec): Observable<PagedResponse<ChannelResponse>> {
    const params = pageableRequest.toHttpParams(staticQuery);
    return this.http.get<PagedResponse<ChannelResponse>>('/api/channels', {
      params,
      headers: AbstractPagedService.ACCEPT_JSON
    });
  }

  getChannelSummary(id: string): Observable<ChannelSummaryResponse> {
    return this.http.get<ChannelSummaryResponse>('/api/channels/' + id, {headers: AbstractPagedService.ACCEPT_JSON});
  }

  addChannel(payload: ChannelDialogPayload): Observable<ReadableResponse> {
    return this.http.post<ReadableResponse>('/api/channels', payload, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  updateChannel(payload: ChannelIdModel): Observable<ReadableResponse> {
    // the runner configuration is hardcoded
    // TODO: refactor this
    // - one way is to show a runner configuration dialog
    // - maybe a better way is to store initial runner config on the server side in a channel entity
    const runnerConfig: ChannelDialogPayload = {
      channelIdInput: payload.channelId,
      numberOfThreads: 10,
      executorTimeoutValue: 1,
      executorTimeoutUnit: 'hour',
      commentOrder: 'newest',
      videoLimit: 'Unrestricted',
      commentLimit: 'Unrestricted',
      replyLimit: 'Unrestricted',
    };
    return this.http.put<ReadableResponse>('/api/channels', runnerConfig, {headers: AbstractPagedService.CONTENT_JSON_ACCEPT_JSON});
  }

  deleteById(id: string): Observable<ReadableResponse> {
    return this.http.delete<ReadableResponse>('/api/channels/' + id, {headers: AbstractPagedService.ACCEPT_JSON});
  }

}
