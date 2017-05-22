"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var reactivecustomer_1 = require('./reactivecustomer');
require('rxjs/add/operator/debounceTime');
/*Declare validation rules above the component if this validation is only used inside the component !!!
When this validation rule is used on other components then create the validator in a new file so that you
can just IMPORT it in any component where necessary.

Return values for a validator are allways:
    when it is not valid => with a key name (with value set to true) to add it to the range of errors
    when valid => return null
*/
function emailMatcher(c) {
    var emailControl = c.get('email');
    var confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}
function ratingRange(min, max) {
    return function (c) {
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        ;
        return null;
    };
}
var ReactiveCustomerComponent = (function () {
    function ReactiveCustomerComponent(fb) {
        this.fb = fb;
        this.reactivecustomer = new reactivecustomer_1.ReactiveCustomer();
        this.validationMessages = {
            required: 'Please enter your email address.',
            pattern: 'Please enter a valid email address.'
        };
    }
    Object.defineProperty(ReactiveCustomerComponent.prototype, "addresses", {
        get: function () {
            return this.reactivecustomerForm.get('addresses');
        },
        enumerable: true,
        configurable: true
    });
    ;
    ReactiveCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* using formBuilder */
        this.reactivecustomerForm = this.fb.group({
            firstName: [
                '',
                [forms_1.Validators.required, forms_1.Validators.minLength(3)]
            ],
            lastName: [
                '',
                [forms_1.Validators.required, forms_1.Validators.maxLength(50)]
            ],
            emailGroup: this.fb.group({
                email: [
                    '',
                    [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
                ],
                confirmEmail: [
                    '',
                    forms_1.Validators.required
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
            .valueChanges.subscribe(function (value) { return _this.setNotification(value); });
        // using debounceTime to react to the input after 1 sec.
        var emailControl = this.reactivecustomerForm.get('emailGroup.email');
        emailControl
            .valueChanges
            .debounceTime(1000)
            .subscribe(function (value) { return _this.setMessage(emailControl); });
    };
    ;
    ReactiveCustomerComponent.prototype.addAddress = function () {
        this.addresses.push(this.buildAddress());
    };
    ReactiveCustomerComponent.prototype.buildAddress = function () {
        return this.fb.group({
            addressType: 'home',
            street1: '',
            street2: '',
            city: '',
            provence: '',
            postalcode: ''
        });
    };
    ;
    ReactiveCustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.reactivecustomerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    ;
    ReactiveCustomerComponent.prototype.setMessage = function (c) {
        var _this = this;
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(function (key) {
                return _this.validationMessages[key];
            }).join(' ');
        }
    };
    ;
    ReactiveCustomerComponent.prototype.save = function () {
        console.log(this.reactivecustomerForm);
        console.log('Saved: ' + JSON.stringify(this.reactivecustomerForm.value));
    };
    ;
    // Test functions
    ReactiveCustomerComponent.prototype.populateTestData = function () {
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
    ;
    ReactiveCustomerComponent.prototype.populatePatchTestData = function () {
        this.reactivecustomerForm.patchValue({
            firstName: 'David',
            lastName: 'Vanderheyden'
        });
        console.log('When using patchValue NOT all FormControls are needed to be filled in order to work!!!');
        ;
    };
    ;
    ReactiveCustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'reactive-customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ReactiveCustomerComponent);
    return ReactiveCustomerComponent;
}());
exports.ReactiveCustomerComponent = ReactiveCustomerComponent;
;
//# sourceMappingURL=reactive-customer.component.js.map