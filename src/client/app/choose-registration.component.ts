import { Component } from '@angular/core';

interface IRegistrationOption {
  label: string;
  url: string;
}

@Component({
    templateUrl: './choose-registration.component.html'
})
export class ChooseRegistrationComponent {
    registrationOptions: IRegistrationOption[] = [
        { label: "League of Legends", url: "/lol" }
    ];
}