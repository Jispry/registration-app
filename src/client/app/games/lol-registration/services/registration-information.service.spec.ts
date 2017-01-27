import { TeamModel } from '../models/team.model';
import { PlayerModel } from '../models/player.model';
import {RegistrationInformationService} from './registration-information.service';

describe('RegistrationInformationService', () => {
    let service: RegistrationInformationService;

    beforeEach(() => {
        service = new RegistrationInformationService();
    });

    it('#getTeam should not return undefined', () => {
        expect(service.getTeam()).not.toBeUndefined();
    });

    it('#updateTeam should update team', () => {
        let expectTeamObject: TeamModel = {
            name: 'TeamName'
        };

        service.updateTeam(expectTeamObject);

        expect(service.getTeam()).toEqual(expectTeamObject);
    });

    it('#getPlayers should not return undefined', () => {
        expect(service.getPlayers()).not.toBeUndefined();
    });

    it('#getPlayers should return an array', () => {
        expect(service.getPlayers() instanceof Array).toBeTruthy();
    });

    it('#updatePlayers should update players', () => {
        let expectPlayers: PlayerModel[] = [{
            firstName: 'firstName',
            lastName: 'lastName',
            birthDate: new Date()
        }];

        service.updatePlayers(expectPlayers);

        expect(service.getPlayers()).toEqual(expectPlayers);
    });
});
