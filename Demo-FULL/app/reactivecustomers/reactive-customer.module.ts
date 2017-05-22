import { NgModule } from '@angular/core';

import { ReactiveCustomerComponent } from './reactive-customer.component';
import { ReactiveCustomerRoutingModule } from './reactive-customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';

@NgModule({
    declarations: [
        ReactiveCustomerComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ReactiveCustomerRoutingModule
    ]
})

export class ReactiveCustomerModule { };