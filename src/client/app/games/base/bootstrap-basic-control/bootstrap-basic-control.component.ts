import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName } from '@angular/forms';

@Component({
  selector: 'base-bootstrap-basic-control',
  templateUrl: './bootstrap-basic-control.component.html',
  styleUrls: ['./bootstrap-basic-control.component.css']
})
export class BootstrapBasicControlComponent implements OnInit {

  @Input()
  errorMessage: string;

  @Input()
  label: string;

  @Input()
  labelFor: string;

  @Input()
  refFormControl: FormControl

  /* TODO Fake FormControlName
  @ContentChild(FormControlName)
  controlName: FormControlName*/

  constructor() { }

  ngOnInit() {
  }

  hasError(): boolean {
    return !!this.errorMessage;
  }

  hasSuccess(): boolean {
    //eturn this.controlName && this.controlName.dirty && this.controlName.valid;
    return this.refFormControl && this.refFormControl.dirty && this.refFormControl.valid;
  }

}
