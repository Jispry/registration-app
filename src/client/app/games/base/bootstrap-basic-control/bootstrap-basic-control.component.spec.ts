/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

import { BootstrapBasicControlComponent } from './bootstrap-basic-control.component';

describe('BoostrapBasicControlComponent', () => {
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

    component.refFormControl = new FormControl("value");
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

  it('#hasSuccess() should return true if control is valid and dirty', () => {
    //will be always be valid => no validators
    component.refFormControl.markAsDirty();

    expect(component.hasSuccess()).toBe(true);
  });

  it('#hasSuccess() should return false if control is not dirty', () => {

    expect(component.hasSuccess()).toBe(false);
  });

  describe('Template', () => {
    let label: HTMLLabelElement;
    let mainEl: HTMLDivElement;
    let feedbackControl: HTMLSpanElement;

    beforeEach(() => {
      label = <HTMLLabelElement>fixture.debugElement.query(By.css('.control-label')).nativeElement;
      mainEl = fixture.debugElement.query(By.css('.form-group')).nativeElement;
      feedbackControl = fixture.debugElement.query(By.css('.form-control-feedback')).nativeElement;
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

    it('should not display errorMessage span when no error', () => {
      let errorSpanEl = fixture.debugElement.query(By.css('.help-block'));

      expect(errorSpanEl).not.toBeTruthy();
    });

    it('should display errorMessage when error', () => {
      const expectedErrorMessage = 'expectedErrorMessage';

      component.errorMessage = expectedErrorMessage;
      fixture.detectChanges();
      let errorSpanEl = fixture.debugElement.query(By.css('.help-block'));

      expect(errorSpanEl).toBeTruthy('error span should display');
      expect(errorSpanEl.nativeElement.textContent).toEqual(expectedErrorMessage);
    });

    it('should set error classes on error', () => {
      component.hasError = jasmine.createSpy('hasError').and.returnValue(true);
      
      fixture.detectChanges();

      expect(mainEl.className).toContain('has-error');
      expect(feedbackControl.className).toContain('glyphicon-remove');      
    });

    it('should set success class on success', () => {
      component.hasSuccess = jasmine.createSpy('hasSuccess').and.returnValue(true);
      
      fixture.detectChanges();

      expect(mainEl.className).toContain('has-succes');
      expect(feedbackControl.className).toContain('glyphicon-ok');      
    });
  });
});
