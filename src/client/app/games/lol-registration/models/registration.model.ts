import { PlayerModel } from './player.model';
import { TeamModel } from './team.model';

export class RegistrationModel {
    team: TeamModel;
    players: PlayerModel[];

    constructor() {
        this.team = new TeamModel();
        this.players = [];
    }
}
