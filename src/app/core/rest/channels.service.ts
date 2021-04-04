import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {ChannelResponse} from '../model/channel-response.model';
import {AbstractPagedService} from './abstact-paged.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService extends AbstractPagedService<ChannelResponse> {

  constructor(private http: HttpClient) {
    super();
  }

  find(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): Observable<PagedResponse<ChannelResponse>> {
    const params = pageableRequest.getHttpParams(filter);
    return this.http.get<PagedResponse<ChannelResponse>>('/api/channels', {params, headers: AbstractPagedService.ACCEPT_JSON});
  }

}
