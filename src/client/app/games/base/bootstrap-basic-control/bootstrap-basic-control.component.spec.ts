/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';

import { BootstrapBasicControlComponent } from './bootstrap-basic-control.component';

export class MockElementRef implements ElementRef {
  public nativeElement = {
    querySelector: () => {
      return {
        classList: {
          remove: jasmine.createSpy('remove'),
          add: jasmine.createSpy('add')
        }
      }
    }
  }
}

describe('BoostrapBasicControlComponent', () => {
  describe('TestingModule', () => {
    let component: BootstrapBasicControlComponent;
    let fixture: ComponentFixture<BootstrapBasicControlComponent>;
    
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BootstrapBasicControlComponent],
        providers: [
          { provide: ElementRef, useClass: MockElementRef }
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BootstrapBasicControlComponent);
      component = fixture.componentInstance;

      component.controlName = <any>{
        errors: {
          'required': ''
        },
        dirty: true,
        valid: true
      };
      component.errorMessages = {
        'required': 'Control is required'
      };
      component.myElement = new MockElementRef();

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set errorMessage on error', () => {
      component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
      component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

      fixture.detectChanges();

      expect(component.errorMessage).toEqual(component.errorMessages['required']);
    });

    it('should concat errorMessages on error', () => {
      component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
      component.hasError = jasmine.createSpy('hasError').and.returnValue(true);
      component.controlName = <any>{
        errors: {
          'required': '',
          'errorKey': ''
        }
      };
      component.errorMessages = {
        'required': 'Control is required',
        'errorKey': 'Other Error message'
      };


      fixture.detectChanges();

      expect(component.errorMessage).toEqual('Control is required Other Error message');
    });

    it('should clear errorMessage on success', () => {
      component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);
      component.hasError = jasmine.createSpy('hasError').and.returnValue(false);

      component.errorMessages = {
        'required': 'Control is required'
      };
      fixture.detectChanges();

      expect(component.errorMessage).toEqual('');
    });

    //TODO Fake FormControlName
    it('#hasError() should return true when controlName dirty and invalid', () => {
      component.controlName.dirty = true;
      component.controlName.valid = false;

      expect(component.hasError()).toBeTruthy();
    });

    it('#hasError() should return false when controlName dirty and valid', () => {
      component.controlName.dirty = true;
      component.controlName.valid = true;

      expect(component.hasError()).toBeFalsy();
    });
    
    it('#hasSuccess() should return true if control is valid and dirty',() => {
      component.controlName.dirty = true;
      component.controlName.valid = true;

      expect(component.hasSuccess()).toBeTruthy();
    });

    it('#hasSuccess() should return false if control is dirty and invalid', () => {
      component.controlName.dirty = true;
      component.controlName.valid = false;

      expect(component.hasSuccess()).toBeFalsy();
    });

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
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        fixture.detectChanges();
        let errorEl = fixture.debugElement.query(By.css('.form-control-feedback'));

        expect(errorEl).toBeFalsy();
      });

      it('should display errorMessage when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        fixture.detectChanges();
        let errorEl = fixture.debugElement.query(By.css('.form-control-feedback'));

        expect(errorEl).toBeTruthy('error element should display');
        expect(errorEl.nativeElement.textContent).toEqual(component.errorMessages['required'], "expected message not displayed");
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
      template: `<base-bootstrap-basic-control [errorMessages]='errorMessages'>
                    <input type='text' class="form-control" formControlName='formControlName'/>
                </base-bootstrap-basic-control>`
    })
    class TestHostComponent {

      @ViewChild(BootstrapBasicControlComponent)
      public readonly baseBootstrapComponent: BootstrapBasicControlComponent;

      public readonly errorMessages = {
        'required': 'RequiredErrorMessage'
      };
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

      //set the formControlName 
      // TODO find a way to inject a mockObject via angular
      component.baseBootstrapComponent.controlName = <any>{
        errors: {
          'required': '',
          'errorKey': ''
        }
      }

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
