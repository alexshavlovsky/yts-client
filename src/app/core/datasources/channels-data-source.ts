import {AbstractDataSource} from './abstract-data-source';
import {catchError, finalize} from 'rxjs/operators';
import {PageableRequest} from '../model/pageable-request';
import {of} from 'rxjs';
import {ChannelsService} from '../rest/channels.service';
import {ChannelResponse} from '../model/channel-response.model';

export class ChannelsDataSource extends AbstractDataSource<ChannelResponse> {

  constructor(private channelsService: ChannelsService) {
    super();
  }

  load(pageableRequest: PageableRequest, filter?: { [p: string]: string }): void {
    this.loadingSubject.next(true);
    this.channelsService.find(pageableRequest, filter).pipe(
      catchError(error => {
        this.errorSubject.next(error.message);
        return of(AbstractDataSource.EMPTY_PAGE);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(response => {
      this.contextSubject.next(response);
      this.dataSubject.next(response.content);
    });
  }

}
