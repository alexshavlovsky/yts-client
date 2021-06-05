import {
  DEF_AUTHOR_CTX_MENU_BUILDER,
  DEF_CHANNEL_CTX_MENU_BUILDER,
  DEF_VIDEO_CTX_MENU_BUILDER
} from './context-menu.presets';
import {ColumnSpec} from './column-spec';
import {DEF_COMMENT_BI_LINK_BUILDER} from './link-builder.presets';

const AUTHOR_COLUMN_SPEC: ColumnSpec = {
  title: 'Author', property: 'authorText', class: 'a-left flex2',
  linkBuilder: {idKey: 'authorChannelId', builder: id => 'users/' + id},
  ctxMenuBuilder: DEF_AUTHOR_CTX_MENU_BUILDER
};

const VIDEO_COLUMN_SPEC: ColumnSpec = {
  title: 'Title', property: 'title', class: 'a-left flex4',
  linkBuilder: {idKey: 'videoId', builder: id => 'videos/' + id},
  ctxMenuBuilder: DEF_VIDEO_CTX_MENU_BUILDER
};

const CHANNEL_COLUMN_SPEC: ColumnSpec = {
  title: 'Title', property: 'title', class: 'a-left flex4',
  linkBuilder: {idKey: 'channelId', builder: id => 'channels/' + id},
  ctxMenuBuilder: DEF_CHANNEL_CTX_MENU_BUILDER
};

const PUBLISHED_COLUMN_SPEC: ColumnSpec = {
  title: 'Published', property: 'publishedDate', class: 'a-right flex1', formatDate: 'dd/MM/yy'
};

const STATUS_COLUMN_SPEC: ColumnSpec = {
  title: 'Status', property: 'shortStatus', class: 'a-right flex1 f-small', sortProperty: 'contextStatus_statusCode'
};

// TODO refactor the content alignment of a column so that it does not apply to a table header

export const CHANNEL_TABLE_PRESET: ColumnSpec[] = [
  {title: 'Vanity name', property: 'channelVanityName', class: 'a-left flex4'},
  CHANNEL_COLUMN_SPEC,
  {title: 'Video count', property: 'videoCount', class: 'a-right flex1'},
  {title: 'Subscribers', property: 'subscriberCount', class: 'a-right flex1'},
  STATUS_COLUMN_SPEC,
];

export const CHANNEL_VIDEOS_TABLE_PRESET: ColumnSpec[] = [
  VIDEO_COLUMN_SPEC,
  {title: 'View count', property: 'viewCountText', class: 'a-right flex1'},
  {title: 'Comment count', property: 'totalCommentCount', class: 'a-right flex1'},
  PUBLISHED_COLUMN_SPEC,
  STATUS_COLUMN_SPEC,
];

export const VIDEO_TABLE_PRESET: ColumnSpec[] = [
  {
    ...CHANNEL_COLUMN_SPEC,
    title: 'Channel',
    property: 'channelTitle',
    class: 'a-left flex2 nowrap',
    sortProperty: 'channel'
  },
  ...CHANNEL_VIDEOS_TABLE_PRESET
];

export const USER_COMMENTS_TABLE_PRESET: ColumnSpec[] = [
  {
    ...VIDEO_COLUMN_SPEC,
    title: 'Video',
    property: 'videoTitle',
    class: 'a-left flex2 f-small nowrap',
    sortProperty: 'video',
  },
  {title: 'Comment content', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
  {title: 'Likes', property: 'likeCount', class: 'a-right flex1'},
  {title: 'Replies', property: 'replyCount', class: 'a-right flex1'},
  PUBLISHED_COLUMN_SPEC,
];

export const VIDEO_COMMENTS_TABLE_PRESET: ColumnSpec[] = [
  AUTHOR_COLUMN_SPEC,
  {title: 'Comment content', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
  {title: 'Likes', property: 'likeCount', class: 'a-right flex1'},
  {title: 'Replies', property: 'replyCount', class: 'a-right flex1'},
  PUBLISHED_COLUMN_SPEC,
];

export const COMMENT_TABLE_PRESET: ColumnSpec[] = [
  {
    ...VIDEO_COLUMN_SPEC,
    title: 'Video',
    property: 'videoTitle',
    class: 'a-left flex2 f-small nowrap',
    sortProperty: 'video',
  },
  {...AUTHOR_COLUMN_SPEC, class: 'a-left f-small flex2'},
  {title: 'Comment content', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
  {title: 'Likes', property: 'likeCount', class: 'a-right flex1'},
  {title: 'Replies', property: 'replyCount', class: 'a-right flex1'},
  PUBLISHED_COLUMN_SPEC,
];

export const AUTHOR_TABLE_PRESET: ColumnSpec[] = [
  {...AUTHOR_COLUMN_SPEC, class: 'a-left flex4 nowrap'},
  {title: 'Commented channel count', property: 'commentedChannelCount', class: 'a-right flex1'},
  {title: 'Commented video count', property: 'commentedVideoCount', class: 'a-right flex1'},
  {title: 'Comment count', property: 'commentCount', class: 'a-right flex1'},
  {title: 'Like count', property: 'likeCount', class: 'a-right flex1'},
  {title: 'Reply count', property: 'replyCount', class: 'a-right flex1'},
  {title: 'First seen', property: 'firstSeen', class: 'a-right flex1', formatDate: 'dd/MM/yy'},
  {title: 'Last seen', property: 'lastSeen', class: 'a-right flex1', formatDate: 'dd/MM/yy'},
];
