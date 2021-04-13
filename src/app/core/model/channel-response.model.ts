import {ContextStatusResponse} from './context-status-response.model';
import {WorkerLogResponse} from './worker-log-response.model';
import {VideoResponse} from './video-response.model';

export interface ChannelResponse {
  channelId: string;
  channelVanityName: string;
  title: string;
  videoCount: number;
  subscriberCount: bigint;
}

export interface ChannelDetailedResponse extends ChannelResponse {
  createdDate: Date;
  lastUpdatedDate: Date;
  fetchedVideoCount: number;
  contextStatus: ContextStatusResponse;
}

export interface VideoDetailedResponse extends VideoResponse {
  createdDate: Date;
  lastUpdatedDate: Date;
  contextStatus: ContextStatusResponse;
}

export interface ChannelSummaryResponse {
  channel: ChannelDetailedResponse;
  videos: VideoDetailedResponse[];
  log: WorkerLogResponse[];
  totalComments: number;
}
