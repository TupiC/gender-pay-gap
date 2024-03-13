import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { GlobeComponent } from './globe/globe.component';
import { CloudComponent } from './cloud/cloud.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    GlobeComponent,
    CloudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
