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

export interface ContextMenuItem {
  name: string;
  icon: string;
  link: string;
}

export interface ContextMenu {
  items: ContextMenuItem[];
}

export interface ContextMenuItemBuilder {
  name: string;
  icon: string;
  linkBuilder: LinkBuilder;
}

export interface ContextMenuBuilder {
  itemBuilders: ContextMenuItemBuilder[];
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
