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
  errorMessage: string;

  @Input()
  label: string;

  @Input()
  labelFor: string;

  /*@Input()
  refFormControl: FormControl*/

  //TODO Fake FormControlName
  @ContentChild(FormControlName)
  controlName: FormControlName;

  constructor(private myElement: ElementRef) { }

  ngOnInit() {
    this.updateControlCssClasses();
  }

  ngDoCheck() {
    this.updateControlCssClasses();
  }

  hasError(): boolean {
    return !!this.errorMessage;
  }

  hasSuccess(): boolean {
    return this.controlName && this.controlName.dirty && this.controlName.valid;
    //return this.refFormControl && this.refFormControl.dirty && this.refFormControl.valid;
  }

  private updateControlCssClasses() {
    const htmlElement = <HTMLInputElement>this.myElement.nativeElement.querySelector("input");
    if (!htmlElement) { return; }
    // remove classes before evaluation
    htmlElement.classList.remove(this.formControlSuccess);
    htmlElement.classList.remove(this.formControlDanger);
    
    if (this.hasSuccess()) {
      htmlElement.classList.add(this.formControlSuccess);
    } else if (this.hasError()) {
      htmlElement.classList.add(this.formControlDanger);
    }
  }

}
