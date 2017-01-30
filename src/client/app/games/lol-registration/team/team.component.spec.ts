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
  describe('Isolated tests', () => {
    let component: TeamComponent;
    let mockFormBuilder: any;
    let mockRouter;
    let mockRegistrationInformationService;

    beforeEach(() => {
      mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group']);
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
      mockRegistrationInformationService = jasmine.createSpyObj('RegistrationInformationService', ['getTeam', 'updateTeam']);
      component = new TeamComponent(mockFormBuilder, mockRegistrationInformationService, mockRouter);
    });

    describe('ngOnInit()', () => {
      it('should call getTeam', () => {
        mockRegistrationInformationService.getTeam.and.returnValue({ name: 'name' });

        component.ngOnInit();

        expect(mockRegistrationInformationService.getTeam).toHaveBeenCalledTimes(1);
      });

      it('should instanciate teamForm', () => {
        const expectedFormGroup = {
          name: {
            someValue: 0
          }
        };
        mockRegistrationInformationService.getTeam.and.returnValue({ name: 'name' });
        mockFormBuilder.group.and.returnValue(expectedFormGroup);

        component.ngOnInit();

        expect(mockFormBuilder.group).toHaveBeenCalledTimes(1);
        expect(component.teamForm).toBe(expectedFormGroup);
      });
    });

    describe('nextStep()', () => {
      beforeEach(() => {
        component.teamForm = <any>{
          value: {
            name: 'name'
          },
          valid: true
        };
      });

      it('sould not navigate to Player or call updateTeam if teamForm is invalid', () => {
        component.teamForm.valid = false;

        component.nextStep();

        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(mockRegistrationInformationService.updateTeam).not.toHaveBeenCalled();
      });

      it('should navigate to Player', () => {
        component.nextStep();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['lol', { outlets: { 'form-wizzard': 'player' } }]);
      });

      it('should pass teamData to registrationInformationService.updateTeam', () => {
        component.nextStep();

        expect(mockRegistrationInformationService.updateTeam).toHaveBeenCalledWith(component.teamForm.value);
      });
    });
  });

  describe('Testing module', () => {
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

        expect(component.teamForm.controls['name'].hasError('required')).toBe(true, 'should have "required" error');
        expect(component.teamForm.valid).toBe(false, 'form.valid should be false');
      });
    });
  });
});
