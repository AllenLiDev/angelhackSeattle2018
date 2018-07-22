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
  selector: 'page-hike-two',
  templateUrl: 'hike-two.html',
})
export class HikeTwoPage {

  temperature: number;
  wxPhraseLong: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ibmWeather: IbmWeatherProvider) {
  }


  ionViewDidLoad() {
    this.ibmWeather.getWeather(49.288779, -122.938964).subscribe(res => {
      console.log(res);
      this.temperature = res.temperature;
      this.wxPhraseLong = res.wxPhraseLong;
    });
    console.log('ionViewDidLoad HikeOnePage');

  }

}
