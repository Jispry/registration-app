import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ng2-bootstrap';

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

    AlertModule.forRoot(),
    GamesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
