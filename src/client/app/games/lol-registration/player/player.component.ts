import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  public readonly birthMinDate: NgbDateStruct = { day: 1, month: 1, year: 1932 };
  public readonly birthMaxDate: NgbDateStruct = { day: 31, month: 12, year: 2005 };
  public readonly requiredPlayersCount = 5;

  /**
   * Validation messages
   */
  public readonly validationMessages = {
    'players': {
      // TODO minLenght, MaxLength
    },
    'player': {
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
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * playerForm.controls.players
   */
  get players(): FormArray {
    return <FormArray>this.playerForm.get('players');
  }

  public isDataValid(): boolean {
    return this.isValid;
  }

  public previousStep(): void {
    this.router.navigate(['lol', { outlets: { 'form-wizzard': 'team' } }]);
  }

  public addNewPlayer(): void {
    this.players.push(this.buildPlayer());
  }

  private buildForm(): void {
    this.playerForm = this.formBuilder.group({
      players: this.formBuilder.array([this.buildPlayer()],
        Validators.compose([
          Validators.minLength(this.requiredPlayersCount),
          Validators.maxLength(this.requiredPlayersCount)
        ])
      )
    });

    /*this.playerForm.valueChanges.subscribe(data => this.onFormValueChange(data));
    this.onFormValueChange(); // (re)set validation messages now*/
  }

  private buildPlayer() {
    let playerGroup = this.formBuilder.group({
      firstName: [undefined,
        [Validators.required]
      ],
      lastName: [undefined,
        [Validators.required]
      ],
      birthDate: [undefined,
        [Validators.required],
        // TODO add Date Validation
      ]
    });
    return playerGroup;
  }

  // TODO Error MEssages are not displayed anymore
  /*private onFormValueChange(data?: any) {
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
  }*/

  /**
   * deteced errors
   */
  /*formErrors = {
    'players': '',
  }*/
}
