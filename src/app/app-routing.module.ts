import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './comments/comments.component';
import {ChannelsComponent} from './channels/channels.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'channels'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
