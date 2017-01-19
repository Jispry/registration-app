import { Injectable } from '@angular/core';

import { RegistrationModel } from '../models/registration.model';
import { TeamModel} from '../models/team.model';
import { PlayerModel} from '../models/player.model';

@Injectable()
export class RegistrationInformationService {
    private model: RegistrationModel
    constructor(){
        this.model = new RegistrationModel();
    }

    public updateTeam(team: TeamModel) {
        this.model.team = team;
    }

    public getTeam(): TeamModel {
        return this.model.team;
    }

    public getPlayers() {
        return this.model.players;
    }

    public updatePlayers(players: PlayerModel[]){
        this.model.players = players;
    }
}