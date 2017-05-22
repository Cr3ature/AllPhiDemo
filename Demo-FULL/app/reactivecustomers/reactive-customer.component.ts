import { Component, OnInit } from '@angular/core';
import { FormGroup, /*FormControl,*/ FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { ReactiveCustomer } from './reactivecustomer';
import 'rxjs/add/operator/debounceTime';

/*Declare validation rules above the component if this validation is only used inside the component !!! 
When this validation rule is used on other components then create the validator in a new file so that you
can just IMPORT it in any component where necessary.

Return values for a validator are allways:
    when it is not valid => with a key name (with value set to true) to add it to the range of errors
    when valid => return null
*/
function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };
        return null;
    };
}


@Component({
    moduleId: module.id,
    templateUrl: 'reactive-customer.component.html'
})

export class ReactiveCustomerComponent implements OnInit {

    reactivecustomerForm: FormGroup;
    reactivecustomer: ReactiveCustomer = new ReactiveCustomer();
    emailMessage: string;

    get addresses(): FormArray {
        return <FormArray>this.reactivecustomerForm.get('addresses');
    };

    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        /* using formBuilder */
        this.reactivecustomerForm = this.fb.group({
            firstName: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            lastName: [
                '',
                [Validators.required, Validators.maxLength(50)]
            ],
            emailGroup: this.fb.group({
                email: [
                    '',
                    [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
                ],
                confirmEmail: [
                    '',
                    Validators.required
                ],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: [
                '',
                ratingRange(1, 5)
            ],
            sendCatalog: true,
            addresses: this.fb.array([this.buildAddress()])
        });
        /* using FormControl */
        //this.reactivecustomerForm = new FormGroup({
        //    firstName: new FormControl(),
        //    lastName: new FormControl(),
        //    emailGroup: new FormGroup({
        //        email: new FormControl(),
        //        confirmEmail: new FormControl()
        //    }),
        //    phone: new FormControl(),
        //    notification: new FormControl(),
        //    rating: new FormControl(),
        //    sendCatalog: new FormControl(true)
        //});

        // Watcher to set the validation rules on the notification with a subscribe to the radio buttons
        this.reactivecustomerForm.get('notification')
            .valueChanges.subscribe(value => this.setNotification(value));


        // using debounceTime to react to the input after 1 sec.
        const emailControl = this.reactivecustomerForm.get('emailGroup.email');
        emailControl
            .valueChanges
            .debounceTime(1000)
            .subscribe(value => this.setMessage(emailControl));
    };

    addAddress(): void {
        this.addresses.push(this.buildAddress());
    }

    buildAddress(): FormGroup {
        return this.fb.group({
            addressType: 'home',
            street1: '',
            street2: '',
            city: '',
            provence: '',
            postalcode: ''
        })
    };

    setNotification(notifyVia: string): void {
        const phoneControl = this.reactivecustomerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    };

    save() {
        console.log(this.reactivecustomerForm);
        console.log('Saved: ' + JSON.stringify(this.reactivecustomerForm.value));
    };

    // Test functions
    populateTestData(): void {
        this.reactivecustomerForm.setValue({
            firstName: 'David',
            lastName: 'Vanderheyden',
            emailGroup: {
                email: 'david.vanderheyden@allphi.eu',
                confirmEmail: 'david.vanderheyden@allphi.eu',
            },
            phone: '',
            notification: 'email',
            rating: 5,
            sendCatalog: false
        });
        console.log('When using setValue all FormControls need to be filled in order to work!!!');
    };

    populatePatchTestData(): void {
        this.reactivecustomerForm.patchValue({
            firstName: 'David',
            lastName: 'Vanderheyden'
        });
        console.log('When using patchValue NOT all FormControls are needed to be filled in order to work!!!');;
    };
};