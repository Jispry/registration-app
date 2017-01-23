import { Component, OnInit, OnChanges, DoCheck, Input, ContentChild, ElementRef } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName } from '@angular/forms';

@Component({
  selector: 'base-bootstrap-basic-control',
  templateUrl: './bootstrap-basic-control.component.html',
  styleUrls: ['./bootstrap-basic-control.component.css']
})
export class BootstrapBasicControlComponent implements OnInit, DoCheck {

  private readonly formControlSuccess = 'form-control-success';
  private readonly formControlDanger = 'form-control-danger';

  @Input()
  errorMessages: {
    [key: string]: any;
  };

  @Input()
  label: string;

  @Input()
  labelFor: string;

  errorMessage: string;

  //TODO Fake FormControlName
  @ContentChild(FormControlName)
  controlName: FormControlName;

  // TODO inject fake object on unit test. classic overrrideComponent with useClass does not work
  constructor(public myElement: ElementRef) { }

  ngOnInit() {
    this.updateControl();
  }

  ngDoCheck() {
    this.updateControl();
  }

  hasError(): boolean {
    return this.controlName && this.controlName.dirty && !this.controlName.valid;
  }

  hasSuccess(): boolean {
    return this.controlName && this.controlName.dirty && this.controlName.valid;
    //return this.refFormControl && this.refFormControl.dirty && this.refFormControl.valid;
  }

  private updateControl() {
    const htmlElement = <HTMLInputElement>this.myElement.nativeElement.querySelector("input");
    if (!htmlElement) { return; }
    // remove classes before evaluation
    htmlElement.classList.remove(this.formControlSuccess, this.formControlDanger);
    //htmlElement.classList.remove(this.formControlDanger);

    // clean Erorrmessage
    this.errorMessage = '';
    if (this.hasSuccess()) {
      htmlElement.classList.add(this.formControlSuccess);
    } else if (this.hasError()) {
      htmlElement.classList.add(this.formControlDanger);
      this.setErrorMessages();
    }
  }

  private setErrorMessages() {
    for (const key in this.controlName.errors) {
      this.errorMessage += this.errorMessages[key] + ' ';
    }

    this.errorMessage = this.errorMessage.trim();
  }
}
