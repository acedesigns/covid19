
/* =======================================================
 *
 * Created by anele on 2020/05/04.
 * @anele_ace
 *
 * =======================================================
 */

export class CountriesModel {
    name: string;
    iso2: string;
    iso3: string;
}

export class APIResponse {
    confirmed   : any;
    recovered   : any;
    deaths      : number;
    lastUpdate  : Date
}