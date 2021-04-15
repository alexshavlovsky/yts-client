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
