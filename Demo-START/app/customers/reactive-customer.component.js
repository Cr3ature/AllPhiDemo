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
var customer_1 = require('./customer');
var ReactiveCustomerComponent = (function () {
    function ReactiveCustomerComponent() {
        this.customer = new customer_1.Customer();
    }
    ReactiveCustomerComponent.prototype.ngOnInit = function () {
        this.customerForm = new forms_1.FormGroup({
            firstName: new forms_1.FormControl(),
            lastName: new forms_1.FormControl(),
            email: new forms_1.FormControl(),
            sendCatalog: new forms_1.FormControl(true)
        });
    };
    ReactiveCustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
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