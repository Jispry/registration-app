import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseRegistrationModule } from '../base/base-registration.module';
import { LolWizardComponent } from './lol-wizard.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { RegistrationInformationService } from './services/registration-information.service';

const appRoutes: Routes = [
    {
        path: 'lol', component: LolWizardComponent, children: [
            { path: '', redirectTo: '/lol/(form-wizzard:team)', pathMatch: 'full' },
            { path: 'team', component: TeamComponent, outlet: 'form-wizzard' },
            { path: 'player', component: PlayerComponent, outlet: 'form-wizzard' }
        ]
    }
];

// TODO ADD route animations
@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
        BaseRegistrationModule
    ],
    exports: [LolWizardComponent],
    declarations: [
        LolWizardComponent,
        PlayerComponent,
        TeamComponent
    ],
    providers: [
        RegistrationInformationService,
    ],
})
export class LolRegistrationModule { }
