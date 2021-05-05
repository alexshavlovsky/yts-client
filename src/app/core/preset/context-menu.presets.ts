import {
  DEF_AUTHOR_LINK_BUILDER,
  DEF_CHANNEL_LINK_BUILDER,
  DEF_ROUTER_AUTHOR_SUMMARY_LINK_BUILDER,
  DEF_ROUTER_CHANNEL_SUMMARY_LINK_BUILDER,
  DEF_ROUTER_VIDEO_SUMMARY_LINK_BUILDER,
  DEF_VIDEO_LINK_BUILDER
} from './link-builder.presets';
import {ActionBuilderStrategy, ContextMenuBuilder, ContextMenuItemBuilder, LinkBuilder} from './column-spec';

const adaptLinkToActionBuilder = (likBuilder: LinkBuilder): ActionBuilderStrategy =>
  entity => ({type: 'ROUTE', payload: likBuilder.builder(entity[likBuilder.idKey])});

const newActionStrategy = (type: string, propertyKey: string): ActionBuilderStrategy =>
  entity => ({type, payload: entity[propertyKey]});

export const DEF_CHANNEL_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show channel summary',
  icon: 'pageview',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_ROUTER_CHANNEL_SUMMARY_LINK_BUILDER)
};

export const DEF_CHANNEL_UPDATE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Schedule for update',
  icon: 'update',
  actionBuilderStrategy: newActionStrategy('UPDATE_CHANNEL', 'channelId')
};

export const DEF_VIDEO_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show video summary',
  icon: 'pageview',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_ROUTER_VIDEO_SUMMARY_LINK_BUILDER)
};

export const DEF_AUTHOR_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Show author summary',
  icon: 'pageview',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_ROUTER_AUTHOR_SUMMARY_LINK_BUILDER)
};

export const DEF_AUTHOR_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open channel on Youtube',
  icon: 'open_in_browser',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_AUTHOR_LINK_BUILDER)
};

export const DEF_CHANNEL_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open channel on Youtube',
  icon: 'open_in_browser',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_CHANNEL_LINK_BUILDER)
};

export const DEF_VIDEO_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER: ContextMenuItemBuilder = {
  name: 'Open video on Youtube',
  icon: 'open_in_browser',
  actionBuilderStrategy: adaptLinkToActionBuilder(DEF_VIDEO_LINK_BUILDER)
};

export const DEF_CHANNEL_CTX_MENU_BUILDER: ContextMenuBuilder = {
  itemBuilders: [
    DEF_CHANNEL_SHOW_SUMMARY_CTX_MENU_ITEM_BUILDER,
    DEF_CHANNEL_OPEN_ON_YOUTUBE_CTX_MENU_ITEM_BUILDER,
    DEF_CHANNEL_UPDATE_CTX_MENU_ITEM_BUILDER
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
