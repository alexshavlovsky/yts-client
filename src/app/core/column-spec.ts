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
