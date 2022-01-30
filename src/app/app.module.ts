import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './tile/tile.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { StatsComponent } from './stats/stats.component';
import { InMemoryWordServiceService } from './in-memory-word-service.service';
import { environment } from  '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    KeyboardComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryWordServiceService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor(
  ) 
  { 

  }

  ngOnInit(): void {
    
  }
}
