export interface IStepComponent {
    isDataValid(): boolean;
}

export interface IStep {
    name: string;
    canAccess: boolean;
}

/**
 * base class for Wizard form components
 * TODO revisit
 */
export abstract class BaseWizardCompoment {
    /*public steps: IStep[];
    public currentStep: IStep;
    public currentStepComponent: IStepComponent;*/

    constructor() { };
/*
    public nextStep() {
        let index = this.getStepIndex(this.currentStep.name) + 1;
        console.log(this.currentStep);

        var stepComponent = this.getComponentByStepName(this.currentStep.name);
        if (stepComponent.isDataValid() && index < this.steps.length) {
            this.steps[index].canAccess = true;
            this.setStep(index);
        }
    }

    public goToStep(stepName: string) {
        let index = this.getStepIndex(stepName);
        this.setStep(index);
    }

    protected updateCurrentStepComponent(): void {
        this.currentStepComponent = this.getComponentByStepName(this.currentStep.name);
    }

    private setStep(index: number) {
        if (index < this.steps.length && this.steps[index].canAccess) {
            this.currentStep = this.steps[index];
        }
        //todo error handlig
    }

    private getStepIndex(stepName: string): number {
        return this.steps.findIndex((step) => step.name === stepName);
    }

    abstract getComponentByStepName(stepName: string): IStepComponent
    */
}
