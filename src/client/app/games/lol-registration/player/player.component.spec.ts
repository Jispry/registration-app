/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Directive } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

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

  beforeEach(async(() => {
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
            { provide: RegistrationInformationService, useValue: registrationServiceStub }
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

  it('should have formErrors Object', () => {
    expect(component.formErrors).toBeTruthy();
  });

  it('formErrors should have all required properties', () => {
    const expectedFormErrorsKeys = ['firstName', 'lastName', 'birthDate'];

    expect(Object.keys(component.formErrors)).toEqual(expectedFormErrorsKeys);
  });

  it('formErrors should not initialy contain any error messages', () => {
    Object.keys(component.formErrors).forEach(element => {
      expect(component.formErrors[element]).toEqual('', `'{element}' should be empty`);
    });
  });

  describe('Form', () => {
    it('shoud create teamForm', () => {
      expect(component.playerForm instanceof FormGroup).toBe(true);
    });

    it('should have all required controls', () => {
      let expecedControls = ['firstName', 'lastName', 'birthDate'];

      expect(Object.keys(component.playerForm.controls)).toEqual(expecedControls);
    });

    it('firstName should be required', () => {
      checkFormRequired('firstName');
    });

    it('lastName should be required', () => {
      checkFormRequired('lastName');
    });

    it('birthDate should be required', () => {
      checkFormRequired('birthDate');
    });

    function checkFormRequired(controlKey: string) {
      component.playerForm.controls[controlKey].setValue(undefined);

      expect(component.playerForm.controls[controlKey].hasError('required')).toBe(true, 'should have "required" error');
      expect(component.playerForm.valid).toBe(false, 'form.valid shoudl be false');
    }
  });
});
