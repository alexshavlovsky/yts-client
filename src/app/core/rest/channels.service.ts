import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableRequest} from '../model/pageable-request';
import {PagedResponse} from '../model/paged-response.model';
import {ChannelResponse} from '../model/channel-response.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) {
  }

  static ACCEPT_JSON = new HttpHeaders({Accept: 'application/json'});

  find(pageableRequest: PageableRequest, filter: { [property: string]: string } | undefined): Observable<PagedResponse<ChannelResponse>> {
    const params = pageableRequest.getHttpParams(filter);
    return this.http.get<PagedResponse<ChannelResponse>>('/api/channels', {params, headers: ChannelsService.ACCEPT_JSON});
  }

}
