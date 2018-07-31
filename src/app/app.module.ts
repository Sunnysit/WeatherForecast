import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageDefault }    from './app.pagedefault';
import { HomeComponent } from './app.home';
import { ForecastDetail } from './app.detail';
import { routing }        from './app.routing';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageDefault,
    HomeComponent, ForecastDetail,
  ],
  imports: [
    BrowserModule, routing, HttpModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
