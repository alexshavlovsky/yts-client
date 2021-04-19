import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './features/comments/comments.component';
import {ChannelsComponent} from './features/channels/channels.component';
import {VideosComponent} from './features/videos/videos.component';
import {ChannelSummaryComponent} from './features/channel-summary/channel-summary.component';
import {VideoSummaryComponent} from './features/video-summary/video-summary.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'videos/:videoId', component: VideoSummaryComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'channels/:channelId', component: ChannelSummaryComponent},
  {path: '', pathMatch: 'full', redirectTo: 'comments'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
