import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {CommentsComponent} from './comments/comments.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { BasicCellComponent } from './comments/basic-cell/basic-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    BasicCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
