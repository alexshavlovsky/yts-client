import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {CommentsComponent} from './features/comments/comments.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {BasicCellComponent} from './shared/basic-cell/basic-cell.component';
import {CornerMenuComponent} from './shared/corner-menu/corner-menu.component';
import {ChannelsComponent} from './features/channels/channels.component';
import {VideosComponent} from './features/videos/videos.component';
import {AddChannelDialogComponent} from './shared/corner-menu/add-channel-dialog/add-channel-dialog.component';
import {RichTableComponent} from './shared/rich-table/rich-table.component';
import {ChannelSummaryComponent} from './features/channel-summary/channel-summary.component';
import {VideoSummaryComponent} from './features/video-summary/video-summary.component';
import {ChannelCardComponent} from './features/channel-summary/channel-card/channel-card.component';
import {VideoCardComponent} from './features/video-summary/video-card/video-card.component';
import {WorkerLogTableComponent} from './shared/worker-log-table/worker-log-table.component';
import {CustomDatePipe} from './shared/pipe/custom-date.pipe';
import {CenterSpinnerComponent} from './shared/center-spinner/center-spinner.component';
import {UserSummaryComponent} from './features/user-summary/user-summary.component';
import {UsersComponent} from './features/users/users.component';
import {UserCardComponent} from './features/user-summary/user-card/user-card.component';
import {ToVideoLinkPipe} from './shared/pipe/to-video-link.pipe';
import {ToChannelLinkPipe} from './shared/pipe/to-channel-link.pipe';
import {ToAuthorDetailsLinkPipe} from './shared/pipe/to-author-details-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    BasicCellComponent,
    CornerMenuComponent,
    ChannelsComponent,
    VideosComponent,
    AddChannelDialogComponent,
    RichTableComponent,
    ChannelSummaryComponent,
    VideoSummaryComponent,
    ChannelCardComponent,
    VideoCardComponent,
    WorkerLogTableComponent,
    CustomDatePipe,
    CenterSpinnerComponent,
    UserSummaryComponent,
    UsersComponent,
    UserCardComponent,
    ToVideoLinkPipe,
    ToChannelLinkPipe,
    ToAuthorDetailsLinkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}, Title],
  bootstrap: [AppComponent],
  entryComponents: [AddChannelDialogComponent]
})
export class AppModule {
}
