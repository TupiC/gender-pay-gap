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
import { CountUpModule } from 'ngx-countup';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { EuropeComponent } from './europe/europe.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    GlobeComponent,
    CloudComponent,
    RendererComponent,
    ChartComponent,
    HeroComponent,
    EuropeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountUpModule,
    AngularFullpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
