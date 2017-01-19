/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { BaseRegistrationModule } from '../../base/base-registration.module';
import { TeamComponent } from './team.component';
import { RegistrationInformationService } from '../services/registration-information.service';

class FakeRegistrationInformationService {
  getTeam() {
    return { name: 'TeamName' };
  }
  updateTeam(team: any) {
  }
}

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let routerStub;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TeamComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(TeamComponent, {
        set: {
          providers: [
            { provide: RegistrationInformationService, useClass: FakeRegistrationInformationService },
            { provide: Router, useValue: routerStub }
          ],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inicialize teamModel', () => {
    expect(component.teamModel).toBeTruthy();
  });

  it('should have formErrors Object', () => {
    expect(component.formErrors).toBeTruthy();
  });

  it('formErrors should have all required properties', () => {
    const expectedFormErrorsKeys = ['name'];

    expect(Object.keys(component.formErrors)).toEqual(expectedFormErrorsKeys);
  });

  it('formErrors should not initialy contain any error messages', () => {
    Object.keys(component.formErrors).forEach(element => {
      expect(component.formErrors[element]).toEqual('', `'{element}' should be empty`);
    });
  });

  it('should load data for teamModel from sevice', () => {
    expect(component.teamModel.name).toEqual('TeamName', "teamModel.name shoud have value TeamName");
  });

  describe('nextStep()', () => {

    it('should navigate to Player', () => {
      component.nextStep();

      expect(routerStub.navigate).toHaveBeenCalledWith(['lol', { outlets: { 'form-wizzard': 'player' } }]);
    });

    it('should pass component.teamModel to registrationInformationService.updateTeam', () => {
      let modelService: FakeRegistrationInformationService = fixture.debugElement.injector.get(RegistrationInformationService);
      modelService.updateTeam = jasmine.createSpy('updateTeam');

      component.nextStep();

      expect(modelService.updateTeam).toHaveBeenCalledWith(component.teamModel);
    });
  });

  //TODO unit test validation messages
  describe('Form', () => {
    it('shoud create teamForm', () => {
      expect(component.teamForm instanceof FormGroup).toBe(true);
    });

    it('should have all required controls', () => {
      let expecedControls = ['name'];

      expect(Object.keys(component.teamForm.controls)).toEqual(expecedControls);
    });

    it('name should be required', () => {
      component.teamForm.controls['name'].setValue(undefined);

      expect(component.teamForm.controls['name'].hasError('required')).toBe(true, 'shoudl have "required" error');
      expect(component.teamForm.valid).toBe(false, 'form.valid should be false');
    });
  });
});
