
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */


import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatSelectModule } from '@angular/material';


import { AppComponent } from './app.component';
import { CountUpDirective } from '../directives/countup';

@NgModule({

    declarations: [ AppComponent, CountUpDirective ],

    imports: [
        BrowserModule, BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule, MatButtonModule, MatSelectModule,

    ],

    exports: [ CountUpDirective ],

    providers: [  ],

    bootstrap: [AppComponent]
})
export class AppModule { }
