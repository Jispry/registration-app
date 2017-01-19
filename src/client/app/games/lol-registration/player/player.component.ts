import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IStepComponent } from '../../base/base-wizard.component';
import { PlayerModel } from '../models/player.model';
import { RegistrationInformationService } from '../services/registration-information.service';

@Component({
  selector: 'lol-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, IStepComponent {
  private isValid = false;
  public playerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  public isDataValid(): boolean {
    return this.isValid;
  }

  private buildForm(): void {
    this.playerForm = this.formBuilder.group({
      firstName: [undefined,
        [Validators.required]
      ],
      lastName: [undefined,
        [Validators.required]
      ],
      birthDate: [undefined,
        [Validators.required]
      ]
    });

    this.playerForm.valueChanges.subscribe(data => this.onFormValueChange(data));

    this.onFormValueChange(); // (re)set validation messages now
  }

  private onFormValueChange(data?: any) {
    if (!this.playerForm) { return; }

    const form = this.playerForm;
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
  }

  /**
   * deteced errors
   */
  formErrors = {
    'firstName': '',
    'lastName': '',
    'birthDate': ''
  }

  /**
   * Validation messages
   */
  private readonly validationMessages = {
    'firstName': {
      'required': 'First name is Required',
    },
    'lastName': {
      'required': 'Last name is Required',
    },
    'birthDate': {
      'required': 'Birth date is Required'
    }
  }
}
