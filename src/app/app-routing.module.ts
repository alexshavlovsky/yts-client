import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './features/comments/comments.component';
import {ChannelsComponent} from './features/channels/channels.component';
import {VideosComponent} from './features/videos/videos.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'comments'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
