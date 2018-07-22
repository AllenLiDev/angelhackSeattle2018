import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the IbmWeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IbmWeatherProvider {

  constructor(public http: Http) {
    console.log('Hello IbmWeatherProvider Provider');
  }

  getWeather(lat, lng){
    return this.http.get("https://api.weather.com/v3/wx/observations/current?geocode=" + lat + "%2C" + lng + "&units=m&language=en-US&format=json&apiKey=5424e9662cbf4bc3a4e9662cbf4bc3fe")
    .map((res) => res.json());
  }

}
