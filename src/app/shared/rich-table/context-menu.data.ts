import {
  DEF_AUTHOR_LINK_BUILDER,
  DEF_CHANNEL_LINK_BUILDER,
  DEF_ROUTER_AUTHOR_SUMMARY_LINK_BUILDER,
  DEF_ROUTER_CHANNEL_SUMMARY_LINK_BUILDER,
  DEF_ROUTER_VIDEO_SUMMARY_LINK_BUILDER,
  DEF_VIDEO_LINK_BUILDER,
  LinkBuilder
} from '../../core/table-connector/column-spec';

export interface ContextMenuItem {
  name: string;
  icon: string;
  link: string;
}

export interface ContextMenuData {
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

export const DEF_CHANNEL_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show channel summary',
  icon: 'pageview',
  linkBuilder: DEF_ROUTER_CHANNEL_SUMMARY_LINK_BUILDER
};

export const DEF_VIDEO_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show video summary',
  icon: 'pageview',
  linkBuilder: DEF_ROUTER_VIDEO_SUMMARY_LINK_BUILDER
};

export const DEF_AUTHOR_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show author summary',
  icon: 'pageview',
  linkBuilder: DEF_ROUTER_AUTHOR_SUMMARY_LINK_BUILDER
};

export const DEF_AUTHOR_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open channel on Youtube',
  icon: 'open_in_browser',
  linkBuilder: DEF_AUTHOR_LINK_BUILDER
};

export const DEF_CHANNEL_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open channel on Youtube',
  icon: 'open_in_browser',
  linkBuilder: DEF_CHANNEL_LINK_BUILDER
};

export const DEF_VIDEO_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open video on Youtube',
  icon: 'open_in_browser',
  linkBuilder: DEF_VIDEO_LINK_BUILDER
};

export const DEF_CHANNEL_CTX_MENU_BUILDER: ContextMenuBuilder = {
  itemBuilders: [
    DEF_CHANNEL_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER,
    DEF_CHANNEL_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER
  ]
};

export const DEF_VIDEO_CTX_MENU_BUILDER: ContextMenuBuilder = {
  itemBuilders: [
    DEF_VIDEO_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER,
    DEF_VIDEO_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER
  ]
};

export const DEF_AUTHOR_CTX_MENU_BUILDER: ContextMenuBuilder = {
  itemBuilders: [
    DEF_AUTHOR_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER,
    DEF_AUTHOR_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER
  ]
};

