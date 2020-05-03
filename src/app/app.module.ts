
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CountUpDirective } from '../directives/count-up.directive';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent, CountUpDirective],

    imports: [
        BrowserModule, BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule, MatButtonModule, MatSelectModule,

    ],

    providers: [  ],

    bootstrap: [AppComponent]
})
export class AppModule { }
