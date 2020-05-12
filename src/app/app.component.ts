
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * https://github.com/adrianhajdin/project_corona_tracker
 *
 * =======================================================
 */

import { Component, OnInit } from '@angular/core';
import * as  Chart from 'chart.js';
import { Covid19Service } from './app.service';

import { CountriesModel } from './app.model';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

    title = 'Covid 19 ';

    LineChart   = [];
    BarChart    = [];
    confirmedCases: any;
    recoveredCases: any;
    deathCases: any;
    lastUpdate: Date;


    myCountries: Array<CountriesModel>;
    selectedCountry: string = '';
    linecart: boolean = true;

    constructor( public rest: Covid19Service ) { }


    ngOnInit () {
        this.getCovidResults(this.selectedCountry);

        this.getCountries();
        this.getChartDetails(this.selectedCountry);

    }

    drawBarChart(data, country) {
        this.BarChart = new Chart('barChart', {
            type: 'bar',
            data: {
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [{
                    label: '# of Votes',
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: { display:false },
                title:{
                    text:`Current State in ${country}`,
                    display:true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    drawLineChart(data) {
        this.LineChart = new Chart('lineChart', {
            type: 'line',
            data: {
                labels: data.map( ({ date }) => date ),
                datasets: [
                    {
                        label:'Infected',
                        data: data.map( ({confirmed}) => confirmed ),
                        fill:true,
                        lineTension:0.2,
                        borderColor:"blue",
                        borderWidth: 1
                    },

                    {
                        label:'Deaths',
                        data: data.map( ( {deaths} ) => deaths ),
                        fill:true,
                        lineTension:0.2,
                        borderColor:"red",
                        backgroundColor : 'rgba(255,0,0,05)',
                        borderWidth: 1
                    },
                ]
            },
            options: {
                title:{
                    text:"Covid 19 Worldwide",
                    display:true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }


    onCountrySelection(country) {
        this.getCovidResults(country);
        this.getChartDetails(country);
    }

    getChartDetails(country) {
        if (country) {
            this.linecart = false;
            this.rest.getResults(country).subscribe(
                data => {
                    this.drawBarChart(data, country);
                },
                error => { console.log("getCovidResults"); console.log(error) },

                () => { }
            );
        } else {
            this.linecart = true;
            this.rest.getDailyStats().subscribe(
                data => {
                    this.drawLineChart(data);
                },
                error => { console.log("subscribe"); console.log(error) },

                () => { }
            );
        }


    }


    getCovidResults(country) {

        this.rest.getResults(country).subscribe(
            data => {
                this.confirmedCases = data.confirmed;
                this.recoveredCases = data.recovered;
                this.deathCases     = data.deaths;
                this.lastUpdate     = data.lastUpdate;
            },
            error => { console.log("getCovidResults"); console.log(error) },

            () => { }
        );
    }


    getCountries() {
        this.rest.getAllCountries().subscribe(
            data => {
                this.myCountries = data;
            },

            error => { console.log("getCovidCountries"); console.log(error) },

            () => { }
        )
    }


}
