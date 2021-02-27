export interface CommentResponse {
  commentId: string;
  videoId: string;
  authorText: string;
  channelId: string;
  publishedTimeText: string;
  text: string;
  likeCount: number;
  replyCount: number;
  parentId: string | null;
  createdDate: Date;
  lastUpdatedDate: Date | null;
}
