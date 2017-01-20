/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Component, ViewChild } from '@angular/core';
import { FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';

import { BootstrapBasicControlComponent } from './bootstrap-basic-control.component';

describe('BoostrapBasicControlComponent', () => {
  describe('TestingModule', () => {
    let component: BootstrapBasicControlComponent;
    let fixture: ComponentFixture<BootstrapBasicControlComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BootstrapBasicControlComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BootstrapBasicControlComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      //component.refFormControl = new FormControl("value");
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('#hasError() should return true if errorMessage is set', () => {
      component.errorMessage = 'errorMessage';

      expect(component.hasError()).toBe(true);
    });

    it('#hasError() should return false if errorMessage is not set', () => {
      expect(component.hasError()).toBe(false);
    });

    /*
    TODO Fake FormControlName
    it('#hasSuccess() should return true if control is valid and dirty',() => {
      //will be always be valid => no validators
      component.refFormControl.markAsDirty();

      expect(component.hasSuccess()).toBe(true);
    });

    it('#hasSuccess() should return false if control is not dirty', () => {

      expect(component.hasSuccess()).toBe(false);
    });*/

    describe('Template', () => {
      let label: HTMLLabelElement;
      let mainEl: HTMLDivElement;

      beforeEach(() => {
        label = <HTMLLabelElement>fixture.debugElement.query(By.css('.form-control-label')).nativeElement;
        mainEl = fixture.debugElement.query(By.css('.form-group')).nativeElement;
      });
      it('should display label', () => {
        const expectedLabel = 'expectedLabel';

        component.label = expectedLabel;
        fixture.detectChanges();

        expect(label.textContent).toEqual(expectedLabel);
      });

      it('should set for in label', () => {
        const expectedLabelFor = 'labelFor';

        component.labelFor = expectedLabelFor;
        fixture.detectChanges();

        expect(label.getAttribute('for')).toEqual(expectedLabelFor);
      });

      it('should not display errorMessage when no error', () => {
        component.errorMessage = "";

        fixture.detectChanges();
        let errorEl = fixture.debugElement.query(By.css('.form-control-feedback'));

        expect(errorEl).toBeFalsy();
      });

      it('should display errorMessage when error', () => {
        const expectedErrorMessage = 'expectedErrorMessage';

        component.errorMessage = expectedErrorMessage;
        fixture.detectChanges();
        let errorEl = fixture.debugElement.query(By.css('.form-control-feedback'));

        expect(errorEl).toBeTruthy('error element should display');
        expect(errorEl.nativeElement.textContent).toEqual(expectedErrorMessage, "expected message not displayed");
      });

      it('should set error classes on error', () => {
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        fixture.detectChanges();

        expect(mainEl.className).toContain('has-danger');
      });

      it('should set success class on success', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        fixture.detectChanges();

        expect(mainEl.className).toContain('has-succes');
      });
    });
  });
  describe('Inside of a TestHostComponent', () => {
    @Component({
      template: `<base-bootstrap-basic-control>
                    <input type='text' class="form-control" formControlName='formControlName'/>
                </base-bootstrap-basic-control>`
    })
    class TestHostComponent {

      @ViewChild(BootstrapBasicControlComponent)
      public readonly baseBootstrapComponent: BootstrapBasicControlComponent;
    }

    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    const formControlSuccess = 'form-control-success';
    const formControlDanger = 'form-control-danger';

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, BootstrapBasicControlComponent],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create testingComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should create inner component', () => {
      expect(component.baseBootstrapComponent).toBeTruthy();
    });

    it('should add form-control-success class on input when success', () => {
      component.baseBootstrapComponent.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

      component.baseBootstrapComponent.ngDoCheck();
      const input = <HTMLInputElement>fixture.debugElement.query(By.css('input')).nativeElement;

      expect(input.classList.contains(formControlSuccess)).toBeTruthy(`should contain class '${formControlSuccess}'`);
      expect(input.classList.contains(formControlDanger)).toBeFalsy(`should not contain class '${formControlDanger}'`);
    });

    it('should add form-control-danger class on input when error', () => {
      component.baseBootstrapComponent.hasError = jasmine.createSpy('hasError').and.returnValue(true);

      component.baseBootstrapComponent.ngDoCheck();
      const input = <HTMLInputElement>fixture.debugElement.query(By.css('input')).nativeElement;

      expect(input.classList.contains(formControlDanger)).toBeTruthy(`should contain class '${formControlDanger}'`);
      expect(input.classList.contains(formControlSuccess)).toBeFalsy(`should not contain class '${formControlSuccess}'`);
    });
  });
});
