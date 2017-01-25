/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';

import { BootstrapBasicControlComponent } from './bootstrap-basic-control.component';

class MockElementRef implements ElementRef {
  public nativeElement = {
    classList: {
      remove: jasmine.createSpy('remove'),
      add: jasmine.createSpy('add')
    }
  }
}

describe('BoostrapBasicControlComponent', () => {
  let controlNameStub: FormControlName;
  const formControlSuccess = 'form-control-success';
  const formControlDanger = 'form-control-danger';

  describe('Isolated Testest', () => {
    let component: BootstrapBasicControlComponent;
    const errorMessageReq = 'Control is required';
    const errorMessageOther = 'Other error message';

    beforeEach(() => {
      component = new BootstrapBasicControlComponent();

      controlNameStub = <any>{
        errors: {
          'required': ''
        },
        dirty: true,
        valid: true
      };

      component.errorMessages = {
        'required': errorMessageReq,
        'other': errorMessageOther
      };

      component.controlName = controlNameStub;
      component.inputElemnt = new MockElementRef();
    });

    it('#hasError() should return true when controlName dirty and invalid', () => {
      controlNameStub.dirty = true;
      controlNameStub.valid = false;

      expect(component.hasError()).toBeTruthy();
    });

    it('#hasError() should return false when controlName dirty and valid', () => {
      controlNameStub.dirty = true;
      controlNameStub.valid = true;

      expect(component.hasError()).toBeFalsy();
    });

    it('#hasSuccess() should return true if control is valid and dirty', () => {
      controlNameStub.dirty = true;
      controlNameStub.valid = true;

      expect(component.hasSuccess()).toBeTruthy();
    });

    it('#hasSuccess() should return false if control is dirty and invalid', () => {
      controlNameStub.dirty = true;
      controlNameStub.valid = false;

      expect(component.hasSuccess()).toBeFalsy();
    });

    describe('ngOnInit', () => {
      it('should add form-control-success class on input when success', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        component.ngOnInit();

        expect(component.inputElemnt.nativeElement.classList.remove).toHaveBeenCalledWith(formControlSuccess, formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).toHaveBeenCalledWith(formControlSuccess);
        expect(component.inputElemnt.nativeElement.classList.add).not.toHaveBeenCalledWith(formControlDanger);
      });

      it('should clear errorMessage when success', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        component.ngOnInit();

        expect(component.errorMessage).toBe('');
      });

      it('should add form-control-danger class on input when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        component.ngOnInit();

        expect(component.inputElemnt.nativeElement.classList.remove).toHaveBeenCalledWith(formControlSuccess, formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).toHaveBeenCalledWith(formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).not.toHaveBeenCalledWith(formControlSuccess);
      });

      it('should set errorMessage when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        component.ngOnInit();

        expect(component.errorMessage).toBe(errorMessageReq);
      });

      it('should concat errorMessages when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);
        component.controlName = <any>{
          errors: {
            'required': '',
            'other': ''
          }
        };

        component.ngOnInit();

        expect(component.errorMessage).toBe(`${errorMessageReq} ${errorMessageOther}`);
      });
    });

    describe('ngDoCheck', () => {
      it('should add form-control-success class on input when success', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        component.ngDoCheck();

        expect(component.inputElemnt.nativeElement.classList.remove).toHaveBeenCalledWith(formControlSuccess, formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).toHaveBeenCalledWith(formControlSuccess);
        expect(component.inputElemnt.nativeElement.classList.add).not.toHaveBeenCalledWith(formControlDanger);
      });

      it('should clear errorMessage when success', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);

        component.ngOnInit();

        expect(component.errorMessage).toBe('');
      });

      it('should add form-control-danger class on input when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        component.ngDoCheck();

        expect(component.inputElemnt.nativeElement.classList.remove).toHaveBeenCalledWith(formControlSuccess, formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).toHaveBeenCalledWith(formControlDanger);
        expect(component.inputElemnt.nativeElement.classList.add).not.toHaveBeenCalledWith(formControlSuccess);
      });

      it('should set errorMessage when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);

        component.ngDoCheck();

        expect(component.errorMessage).toBe(errorMessageReq);
      });

      it('should concat errorMessages when error', () => {
        component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(false);
        component.hasError = jasmine.createSpy('hasError').and.returnValue(true);
        component.controlName = <any>{
          errors: {
            'required': '',
            'other': ''
          }
        };

        component.ngOnInit();

        expect(component.errorMessage).toBe(`${errorMessageReq} ${errorMessageOther}`);
      });
    });
  });

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
      component.inputElemnt = new MockElementRef();

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

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
  describe('Inside of a TestHostComponent', () => {
    @Component({
      template: `<base-bootstrap-basic-control [errorMessages]='errorMessages'>
                    <input type='text' #inputEl class="form-control" formControlName='formControlName'/>
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

    it('should map input element from ng-content', () => {
      expect(component.baseBootstrapComponent.inputElemnt instanceof ElementRef).toBe(true);
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
