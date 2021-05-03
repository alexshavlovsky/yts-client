import {BiLinkBuilder, BiLinkBuilderStrategy, LinkBuilder, LinkBuilderStrategy} from './column-spec';

export const YT_CHANNEL_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => 'https://www.youtube.com/channel/' + id);
export const YT_VIDEO_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => 'https://www.youtube.com/watch?v=' + id);
export const YT_COMMENT_LINK_BUILDER_STRATEGY: BiLinkBuilderStrategy = ((id1, id2) =>
  'https://www.youtube.com/watch?v=' + id1 + '&lc=' + id2);

export const DEF_AUTHOR_LINK_BUILDER: LinkBuilder = {idKey: 'authorChannelId', builder: YT_CHANNEL_LINK_BUILDER_STRATEGY};
export const DEF_CHANNEL_LINK_BUILDER: LinkBuilder = {idKey: 'channelId', builder: YT_CHANNEL_LINK_BUILDER_STRATEGY};
export const DEF_VIDEO_LINK_BUILDER: LinkBuilder = {idKey: 'videoId', builder: YT_VIDEO_LINK_BUILDER_STRATEGY};

export const DEF_COMMENT_BI_LINK_BUILDER: BiLinkBuilder = {
  idKey1: 'videoId',
  idKey2: 'commentId',
  builder: YT_COMMENT_LINK_BUILDER_STRATEGY
};

export const ROUTER_CHANNEL_SUMMARY_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => '/channels/' + id);
export const DEF_ROUTER_CHANNEL_SUMMARY_LINK_BUILDER: LinkBuilder = {
  idKey: 'channelId',
  builder: ROUTER_CHANNEL_SUMMARY_LINK_BUILDER_STRATEGY
};

export const ROUTER_VIDEO_SUMMARY_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => '/videos/' + id);
export const DEF_ROUTER_VIDEO_SUMMARY_LINK_BUILDER: LinkBuilder = {
  idKey: 'videoId',
  builder: ROUTER_VIDEO_SUMMARY_LINK_BUILDER_STRATEGY
};

export const ROUTER_AUTHOR_SUMMARY_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => '/users/' + id);
export const DEF_ROUTER_AUTHOR_SUMMARY_LINK_BUILDER: LinkBuilder = {
  idKey: 'authorChannelId',
  builder: ROUTER_AUTHOR_SUMMARY_LINK_BUILDER_STRATEGY
};
