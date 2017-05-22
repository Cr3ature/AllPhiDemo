import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div>
            <navbar></navbar>
            <div class="container">
                <router-outlet></router-outlet>
            </div>
        </div>
         `
})
export class AppComponent { };
