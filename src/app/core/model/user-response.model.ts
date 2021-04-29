export interface UserResponse {
  authorChannelId: string;
  authorText: string;
  commentedVideoCount: number;
  commentCount: number;
  likeCount: number;
  replyCount: number;
  firstSeen: Date;
  lastSeen: Date;
}
