import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HikeOnePage } from '../hike-one/hike-one';
import { HikeTwoPage } from '../hike-two/hike-two';
import { IbmWeatherProvider } from '../../providers/ibm-weather/ibm-weather';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public ibmWeather: IbmWeatherProvider) {

  }  

  goToHike(number) {
    if (number === 1) {
      this.navCtrl.push(HikeTwoPage);
    }
    else if (number === 2) {
      this.navCtrl.push(HikeOnePage);
    }
  }

}
