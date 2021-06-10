import {ChannelResponse} from './channel-response.model';
import {VideoResponse} from './video-response.model';

export interface UserBase {
  authorChannelId: string;
  authorText: string;
  commentCount: number;
  likeCount: number;
  replyCount: number;
  firstSeen: Date;
  lastSeen: Date;
}

export interface UserResponse extends UserBase {
  commentedChannelCount: number;
  commentedVideoCount: number;
}

export interface UserCommonCommentedVideos extends UserBase {
  authorChannelId: string;
  authorText: string;
  videoCount: number;
  repPosterVideos: string[];
  repRecipientVideos: string[];
  sameThreadPosterVideos: string[];
}

export interface UserSummaryResponse extends UserBase {
  knownNames: string[];
  commentedChannels: ChannelResponse[];
  commentedVideos: VideoResponse[];
  commentIntersections: UserCommonCommentedVideos[];
}
