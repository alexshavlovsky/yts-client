import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './comments/comments.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'comments'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
