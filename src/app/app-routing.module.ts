import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './comments/comments.component';
import {ChannelsComponent} from './channels/channels.component';
import {VideosComponent} from './videos/videos.component';

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
