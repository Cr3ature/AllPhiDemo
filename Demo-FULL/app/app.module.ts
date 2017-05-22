import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CustomerModule } from './customers/customer.module';
import { ReactiveCustomerModule } from './reactivecustomers/reactive-customer.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CustomerModule,
        ReactiveCustomerModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent
    ],
    providers: [{
        provide: APP_BASE_HREF, useValue: '/'
    }],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
