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
  linkBuilder?: LinkBuilder;
  biLinkBuilder?: BiLinkBuilder;
}

export const YT_CHANNEL_LINK_BUILDER: LinkBuilderStrategy = (id => 'https://www.youtube.com/channel/' + id);
export const YT_COMMENT_LINK_BUILDER: BiLinkBuilderStrategy = ((id1, id2) => 'https://www.youtube.com/watch?v=' + id1 + '&lc=' + id2);
