import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IbmWeatherProvider } from '../../providers/ibm-weather/ibm-weather';

/**
 * Generated class for the HikeOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hike-one',
  templateUrl: 'hike-one.html',
})
export class HikeOnePage {

  temperature: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ibmWeather: IbmWeatherProvider) {
  }


  ionViewDidLoad() {
    this.ibmWeather.getWeather(49.686249, -123.139635).subscribe(res => {
      console.log(res);
      this.temperature=res.temperature;
      });
    console.log('ionViewDidLoad HikeOnePage');

  }

}
