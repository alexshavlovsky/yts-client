import {ContextMenuAction} from './context-menu';

export type ActionBuilderStrategy = (entity: any) => ContextMenuAction;

export interface ContextMenuItemBuilder {
  name: string;
  icon: string;
  actionBuilderStrategy: ActionBuilderStrategy;
}

export interface ContextMenuBuilder {
  itemBuilders: ContextMenuItemBuilder[];
}

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
  formatDate?: string;
}
