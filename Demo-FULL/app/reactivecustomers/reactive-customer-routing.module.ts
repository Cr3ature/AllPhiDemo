import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveCustomerComponent } from './reactive-customer.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'reactiveform', component: ReactiveCustomerComponent }
        ])
    ],
    exports: [RouterModule]
})

export class ReactiveCustomerRoutingModule { };