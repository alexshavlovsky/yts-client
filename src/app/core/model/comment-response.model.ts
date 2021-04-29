export interface CommentResponse {
  commentId: string;
  videoId: string;
  authorText: string;
  authorChannelId: string;
  publishedTimeText: string;
  publishedDate: Date;
  text: string;
  likeCount: number;
  replyCount: number;
  createdDate: Date;
  lastUpdatedDate: Date | null;
}
