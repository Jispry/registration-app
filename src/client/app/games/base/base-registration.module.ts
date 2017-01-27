import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapBasicControlComponent } from './bootstrap-basic-control/bootstrap-basic-control.component';
// import { BaseWizardCompoment } from './base-wizard.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        BootstrapBasicControlComponent
    ],
    declarations: [BootstrapBasicControlComponent],
    providers: [],
})
export class BaseRegistrationModule { }
