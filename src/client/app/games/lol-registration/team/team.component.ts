import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IStepComponent } from '../../base/base-wizard.component';
import { TeamModel } from '../models/team.model';
import { RegistrationInformationService } from '../services/registration-information.service';

@Component({
  selector: 'lol-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, IStepComponent {
  public teamModel: TeamModel;
  public teamForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private modelService: RegistrationInformationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.teamModel = this.modelService.getTeam();
    this.buildForm();
  }

  // TODO REVISIT
  public isDataValid(): boolean {
    return false;
  }

  public nextStep() {
    if (this.teamForm.valid){
      this.modelService.updateTeam(this.teamModel)
      this.router.navigate(['lol', { outlets: { 'form-wizzard': 'player' } }]);
    }
  }

  private buildForm(): void {
    this.teamForm = this.formBuilder.group({
      name: [this.teamModel.name,
      [Validators.required]
      ],
    });

    this.teamForm.valueChanges.subscribe(data => this.onFormValueChange(data));

    this.onFormValueChange(); // (re)set validation messages now
  }

  private onFormValueChange(data?: any) {
    if (!this.teamForm) { return; }

    const form = this.teamForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    this.teamModel = form.value;
  }

  /**
   * deteced errors
   */
  formErrors = {
    'name': '',
  }

  /**
   * Validation messages
   */
  private readonly validationMessages = {
    'name': {
      'required': 'Team name is Required',
    }
  }
}
