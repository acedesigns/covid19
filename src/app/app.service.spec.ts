
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */


import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Covid19Service } from './app.service';

describe('Covid19Service', () => {

    let testService: Covid19Service;

    configureTestSuite(() => {

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],

            providers: [ Covid19Service ],

            schemas: [ NO_ERRORS_SCHEMA ],

            declarations: [  ]
        });
    });

    beforeEach(() => {
        testService = TestBed.get(Covid19Service);
    });

    it('should create Covid19Service', fakeAsync(() => {
        expect(testService).toBeTruthy();
    }));



});