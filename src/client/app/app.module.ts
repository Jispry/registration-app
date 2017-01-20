import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GamesModule } from './games/games.module'
import { ChooseRegistrationComponent } from './choose-registration.component';

const appRoutes: Routes = [
  { path: '**', component: ChooseRegistrationComponent }
];
// TODO ADD route animations
@NgModule({
  declarations: [
    AppComponent, ChooseRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    GamesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
