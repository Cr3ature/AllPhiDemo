import { NgModule } from '@angular/core';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';

@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        CustomerRoutingModule
    ]
})

export class CustomerModule { };