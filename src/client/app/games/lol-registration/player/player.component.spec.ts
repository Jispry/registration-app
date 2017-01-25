/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';

import { PlayerComponent } from './player.component';
import { RegistrationInformationService } from '../services/registration-information.service';

class FakeRegistrationInformationService {
  getTeam() {
    return { name: 'TeamName' };
  }
}

@Directive({
  selector: '[ngbDatepicker]',
  exportAs: 'ngbDatepicker'
})
class FakeNgbDatepickerDirective {
}

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let registrationServiceStub: any;// RegistrationInformationService;
  let routerStub: any;

  const requiredPlayersCount = 5;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    registrationServiceStub = {
      model: {
        team: {
          name: "TeamName"
        },
        players: [
          { firstName: "FirstName", lastName: "lastName", birthDate: new Date(2000, 1, 1) }
        ]
      }
    }

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PlayerComponent, FakeNgbDatepickerDirective],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PlayerComponent, {
        set: {
          providers: [
            { provide: RegistrationInformationService, useValue: registrationServiceStub },
            { provide: Router, useValue: routerStub }
          ],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should have formErrors Object', () => {
    expect(component.formErrors).toBeTruthy();
  });

  it('formErrors should not initialy contain any error messages', () => {
    Object.keys(component.formErrors).forEach(element => {
      expect(component.formErrors[element]).toEqual('', `'{element}' should be empty`);
    });
  });*/

  it('should have birthMinDate of 1932-1-1', () => {
    expect(component.birthMinDate).toEqual({ day: 1, month: 1, year: 1932 });
  })

  it('should have minDate of 2005-12-31', () => {
    expect(component.birthMaxDate).toEqual({ day: 31, month: 12, year: 2005 });
  })

  describe('previousStep()', () => {
    it('should navigate back to team', () => {
      component.previousStep();

      expect(routerStub.navigate).toHaveBeenCalledWith(['lol', { outlets: { 'form-wizzard': 'team' } }]);
    });
  });

  it('should bind boundary values to birthDate datepicker', () => {
    const dateInputEl = fixture.debugElement.query(By.css('#birstDateId')).nativeElement;

    //expect(dateInputEl.ngbDatepicker).toBeTruthy();

    expect(dateInputEl.minDate).toBeTruthy();
    expect(dateInputEl.minDate).toEqual(component.birthMinDate);

    expect(dateInputEl.maxDate).toBeTruthy();
    expect(dateInputEl.maxDate).toEqual(component.birthMaxDate);
  });

  it('should have defined required number of players', () => {
    expect(component.requiredPlayersCount).toBe(requiredPlayersCount);
  })

  describe('Form', () => {
    it('shoud create teamForm', () => {
      expect(component.playerForm instanceof FormGroup).toBe(true);
    });

    it('teamForm should have players', () => {
      expect(component.playerForm.get('players')).toBeTruthy();
    });

    it('should have players group', () => {
      let expecedControls = ['players'];

      expect(Object.keys(component.playerForm.controls)).toEqual(expecedControls);
    });

    it('players should be an FormArray', () => {
      expect(component.playerForm.controls['players'] instanceof FormArray).toBeTruthy();
    });

    it('#addNewPlayer() should and an other player', () => {
      let players = <FormArray>component.playerForm.get('players');

      component.addNewPlayer();

      expect(players.length).toEqual(2);
    });

    it('player group should be valid if it contains requiredPlayersCount of items', () => {
      let players = <FormArray>component.playerForm.get('players');
      pushDummyDataToPlayersArray(requiredPlayersCount);

      expect(players.valid).toBeTruthy();
    });

    it('player group should be invalid if it contains less than requiredPlayersCount of items', () => {
      let players = <FormArray>component.playerForm.get('players');
      pushDummyDataToPlayersArray(requiredPlayersCount - 1);

      expect(players.valid).toBeFalsy();
      expect(players.hasError('minlength')).toBeTruthy('should contain "minlength" error');
    });

    it('player group should be invalid if it contains more than requiredPlayersCount of items', () => {
      let players = <FormArray>component.playerForm.get('players');
      pushDummyDataToPlayersArray(requiredPlayersCount + 1);

      expect(players.valid).toBeFalsy();
      expect(players.hasError('maxlength')).toBeTruthy('should contain "maxlength" error');
    });

    describe('Player form group', () => {
      let playerGroup: FormGroup;
      beforeEach(() => {
        playerGroup = <FormGroup>component.playerForm.get('players').get('0');
      })

      it('should have all required controls', () => {
        let expecedControls = ['firstName', 'lastName', 'birthDate'];

        expect(Object.keys(playerGroup.controls)).toEqual(expecedControls);
      });

      it('Player firstName should be required', () => {
        checkFormRequired('firstName');
      });

      it('lastName should be required', () => {
        checkFormRequired('lastName');
      });

      it('birthDate should be required', () => {
        checkFormRequired('birthDate');
      });

      function checkFormRequired(controlKey: string) {
        playerGroup.controls[controlKey].setValue(undefined);

        expect(playerGroup.controls[controlKey].hasError('required')).toBe(true, 'should have "required" error');
        expect(playerGroup.valid).toBe(false, 'form.valid shoudl be false');
      }
    });

    function pushDummyDataToPlayersArray(ammount: number) {
      let players = <FormArray>component.playerForm.get('players');
      players.removeAt(0);// remove the 1st itemin array because it has some set validations

      for (let i = 0; i < ammount; i++) {
        players.push(new FormGroup({
          someControl: new FormControl()
        }))
      }
    }
  });
});
