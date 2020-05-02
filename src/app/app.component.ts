
/* =======================================================
 *
 * Created by anele on 2020/05/02.
 * @anele_ace
 *
 * =======================================================
 */

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as  Chart from 'chart.js';
import { Covid19ervice } from './app.service';
import { CountUpOptions, CountUp } from 'countup.js'


export interface Countries {
    name: string;
    iso2: string;
    iso3: string;
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

    title = 'Covid 19 ';

    opts: CountUpOptions;

    LineChart   = [];
    BarChart    = [];
    confirmedCases: any;
    recoveredCases: any;
    deathCases: any;
    lastUpdate: Date;


    myCountries: Countries;
    selectedCountry: string = '';

    constructor( public rest:Covid19ervice ) { }


    ngOnInit () {
        this.getCovidResults(this.selectedCountry);

        this.getCovidCountries();
        this.getChartDetails();

    }

    drawBarChart(data) {
        this.BarChart = new Chart('barChart', {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [9,7 , 3, 5, 2, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title:{
                    text:"Bar Chart",
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
    }

    getChartDetails() {
        this.rest.getDailyStats().subscribe(
            data => {
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
            },
            error => { console.log("subscribe"); console.log(error) },

            () => { }
        );
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

    getCovidCountries() {
        this.rest.getAllCountries().subscribe(
            data => {
                this.myCountries = data;
            },

            error => { console.log("getCovidCountries"); console.log(error) },

            () => { }
        )
    }

    private useOptions() {
        this.opts = {
            decimalPlaces: 2,
            separator: ':',
            duration: 5
        };
    }
}
