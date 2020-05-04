
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { configureTestSuite } from 'ng-bullet';


import { AppComponent } from './app.component';
import { Covid19Service } from './app.service';

describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const covidService = jasmine.createSpyObj('Covid19Service', ['getResults', 'getAllCountries', 'getDailyStats']);


    configureTestSuite(() => {


        TestBed.configureTestingModule({

            imports : [ HttpClientTestingModule ],

            providers : [
                //{ provide: Covid19Service, useValue: covidService }
            ],

            schemas: [ NO_ERRORS_SCHEMA ],

            declarations: [ AppComponent ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    afterEach(() => { fixture.destroy(); });


    it('should create the app', () => {
        expect(component).toBeTruthy();
    });



});
