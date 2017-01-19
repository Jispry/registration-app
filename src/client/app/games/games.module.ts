import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LolRegistrationModule } from './lol-registration/lol-registration.module';

@NgModule({
  imports: [
    CommonModule,
    LolRegistrationModule
  ],
  exports: [
    LolRegistrationModule
  ],
  declarations: []
})
export class GamesModule { }
