import {ContextMenuBuilder} from '../../shared/rich-table/context-menu.data';

export type LinkBuilderStrategy = (id: string) => string;

export type BiLinkBuilderStrategy = (id1: string, id2: string) => string;

export interface LinkBuilder {
  idKey: string;
  builder: LinkBuilderStrategy;
}

export interface BiLinkBuilder {
  idKey1: string;
  idKey2: string;
  builder: BiLinkBuilderStrategy;
}

export interface ColumnSpec {
  title: string;
  property: string;
  class: string;
  sortProperty?: string;
  sortDisabled?: boolean;
  linkBuilder?: LinkBuilder;
  biLinkBuilder?: BiLinkBuilder;
  ctxMenuBuilder?: ContextMenuBuilder;
  hideText?: boolean;
}

export const YT_CHANNEL_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => 'https://www.youtube.com/channel/' + id);
export const YT_VIDEO_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => 'https://www.youtube.com/watch?v=' + id);
export const YT_COMMENT_LINK_BUILDER_STRATEGY: BiLinkBuilderStrategy = ((id1, id2) =>
  'https://www.youtube.com/watch?v=' + id1 + '&lc=' + id2);

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

export const ROUTER_USER_SUMMARY_LINK_BUILDER_STRATEGY: LinkBuilderStrategy = (id => '/users/' + id);
export const DEF_ROUTER_USER_SUMMARY_LINK_BUILDER: LinkBuilder = {
  idKey: 'channelId',
  builder: ROUTER_USER_SUMMARY_LINK_BUILDER_STRATEGY
};
