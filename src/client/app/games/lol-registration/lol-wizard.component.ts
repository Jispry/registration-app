import { Component, OnInit, ViewChild, AfterViewChecked, EventEmitter } from '@angular/core';

import { BaseWizardCompoment, IStepComponent } from '../base/base-wizard.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';

@Component({
    selector: 'games-lol',
    templateUrl: './lol-wizard.component.html'
})
export class LolWizardComponent extends BaseWizardCompoment implements OnInit, AfterViewChecked {
    teamRoute = [{ outlets: { 'form-wizzard': 'team'} }];
    constructor() {
        super();
    }

    ngOnInit() {
    }

    ngAfterViewChecked(){
    }
}