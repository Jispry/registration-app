import { Injectable } from '@angular/core';

import { RegistrationModel, TeamModel, PlayerModel } from '../models/index';

@Injectable()
export class RegistrationInformationService {
    private model: RegistrationModel;

    constructor() {
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

    public updatePlayers(players: PlayerModel[]) {
        this.model.players = players;
    }
}
