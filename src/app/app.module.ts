import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { GlobeComponent } from './globe/globe.component';
import { CloudComponent } from './cloud/cloud.component';
import { RendererComponent } from './renderer/renderer.component';
import { ChartComponent } from './chart/chart.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    GlobeComponent,
    CloudComponent,
    RendererComponent,
    ChartComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
