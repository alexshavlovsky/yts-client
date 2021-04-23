import {ContextStatusResponse} from './context-status-response.model';
import {WorkerLogResponse} from './worker-log-response.model';

export interface ChannelResponse {
  channelId: string;
  channelVanityName: string;
  title: string;
  videoCount: number;
  subscriberCount: bigint;
  shortStatus: string;
}

export interface ChannelDetailedResponse extends ChannelResponse {
  createdDate: Date;
  lastUpdatedDate: Date;
  doneVideoCount: number;
  fetchedVideoCount: number;
  contextStatus: ContextStatusResponse;
}

export interface ChannelSummaryResponse {
  channel: ChannelDetailedResponse;
  log: WorkerLogResponse[];
  totalComments: number;
}
