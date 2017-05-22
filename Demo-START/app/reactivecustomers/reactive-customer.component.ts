import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { ReactiveCustomer } from './reactivecustomer';

@Component({
    moduleId: module.id,
    templateUrl: 'reactive-customer.component.html'
})

export class ReactiveCustomerComponent implements OnInit {

    reactivecustomerForm: FormGroup;
    reactivecustomer: ReactiveCustomer = new ReactiveCustomer();
    emailMessage: string;
    
    ngOnInit(): void {
       
        /* using FormControl */
        this.reactivecustomerForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            emailGroup: new FormGroup({
                email: new FormControl(),
                confirmEmail: new FormControl()
            }),
            phone: new FormControl(),
            notification: new FormControl(),
            rating: new FormControl(),
            sendCatalog: new FormControl(true)
        });
    };

    save() {
        console.log(this.reactivecustomerForm);
        console.log('Saved: ' + JSON.stringify(this.reactivecustomerForm.value));
    };
    
};