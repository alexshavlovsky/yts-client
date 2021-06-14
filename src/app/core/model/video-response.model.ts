import {ContextStatusResponse} from './context-status-response.model';
import {WorkerLogResponse} from './worker-log-response.model';

export interface VideoResponse {
  videoId: string;
  channelId: string;
  title: string;
  publishedTimeText: string;
  publishedDate: Date;
  viewCountText: number;
  totalCommentCount: number;
  shortStatus: string;
}

export interface VideoDetailedResponse extends VideoResponse {
  createdDate: Date;
  lastUpdatedDate: Date;
  contextStatus: ContextStatusResponse;
}

export interface VideoStatResponse {
  totalCommentCount: number;
  replyCount: number;
  uniqueAuthorsCount: number;
}

export interface VideoSummaryResponse {
  video: VideoDetailedResponse;
  log: WorkerLogResponse[];
  stat: VideoStatResponse;
}
