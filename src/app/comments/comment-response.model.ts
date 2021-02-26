export interface CommentResponse {
  commentId: string;
  videoId: string;
  chanelId: string;
  authorText: string;
  publishedTimeText: string;
  text: string;
  likeCount: number;
  replyCount: number;
  parentId: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
