import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IStepComponent } from '../../base/base-wizard.component';
import { TeamModel } from '../models/index';
import { RegistrationInformationService } from '../services/registration-information.service';

@Component({
  selector: 'lol-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, IStepComponent {
  public teamForm: FormGroup;

  /**
   * Validation messages
   */
  public readonly validationMessages = {
    'name': {
      'required': 'Team name is Required',
    }
  };

  constructor(private formBuilder: FormBuilder,
    private modelService: RegistrationInformationService,
    private router: Router) {
  }

  ngOnInit(): void {
    const teamModel = this.modelService.getTeam();
    this.buildForm(teamModel);
  }

  // TODO REVISIT
  public isDataValid(): boolean {
    return false;
  }

  public nextStep() {
    if (this.teamForm.valid) {
      this.modelService.updateTeam(this.teamForm.value);
      this.router.navigate(['lol', { outlets: { 'form-wizzard': 'player' } }]);
    }
  }

  private buildForm(teamModel: TeamModel): void {
    this.teamForm = this.formBuilder.group({
      name: [teamModel.name,
      [Validators.required]
      ],
    });
  }
}
