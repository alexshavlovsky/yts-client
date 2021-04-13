import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './features/comments/comments.component';
import {ChannelsComponent} from './features/channels/channels.component';
import {VideosComponent} from './features/videos/videos.component';
import {ChannelSummaryComponent} from './features/channel-summary/channel-summary.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'videos', component: VideosComponent},
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
