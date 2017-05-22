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
var ReactiveCustomerComponent = (function () {
    function ReactiveCustomerComponent() {
        this.reactivecustomer = new reactivecustomer_1.ReactiveCustomer();
    }
    ReactiveCustomerComponent.prototype.ngOnInit = function () {
        /* using FormControl */
        this.reactivecustomerForm = new forms_1.FormGroup({
            firstName: new forms_1.FormControl(),
            lastName: new forms_1.FormControl(),
            emailGroup: new forms_1.FormGroup({
                email: new forms_1.FormControl(),
                confirmEmail: new forms_1.FormControl()
            }),
            phone: new forms_1.FormControl(),
            notification: new forms_1.FormControl(),
            rating: new forms_1.FormControl(),
            sendCatalog: new forms_1.FormControl(true)
        });
    };
    ;
    ReactiveCustomerComponent.prototype.save = function () {
        console.log(this.reactivecustomerForm);
        console.log('Saved: ' + JSON.stringify(this.reactivecustomerForm.value));
    };
    ;
    ReactiveCustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'reactive-customer.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ReactiveCustomerComponent);
    return ReactiveCustomerComponent;
}());
exports.ReactiveCustomerComponent = ReactiveCustomerComponent;
;
//# sourceMappingURL=reactive-customer.component.js.map