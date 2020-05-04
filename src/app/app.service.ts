
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const APIURL  = 'https://covid19.mathdro.id/api';

import { APIResponse } from './app.model';

@Injectable({providedIn: 'root'})

export class Covid19Service {


    constructor( private http: HttpClient ) { }


    getResults(country): Observable<any> {

        let changed = APIURL;

        if ( country ) {
            changed = `${APIURL}/countries/${country}`;
        }

        return this.http.get<APIResponse>(changed).pipe(
            map( (response: APIResponse)  => {
                const modified = { confirmed : response.confirmed, recovered : response.recovered,
                    deaths : response.deaths, lastUpdate : response.lastUpdate };

                return modified;
                }
            ));
    }


    getAllCountries() {
        try {
            return this.http.get(`${APIURL}/countries`).pipe(
                map( (response: any)  => {
                    return response.countries;
                })
            );
        } catch (error) {
            console.log(error)
        }
    }


    getDailyStats() {
        try {
            return this.http.get(`${APIURL}/daily`).pipe(
                map( (response: any) => {

                    let modified = response.map( (dailyData) => ({
                        confirmed : dailyData.confirmed.total,
                        deaths: dailyData.deaths.total,
                        date : dailyData.reportDate
                    }) );
                    return modified;
                } )
            );
        } catch (error ) {
            console.log(error)
        }
    }


}
