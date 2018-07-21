import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HikeOnePage } from '../hike-one/hike-one';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  goToHike(number) {
    console.log("did it");
    if (number === 1) {
      this.navCtrl.push(HikeOnePage);
    }
  }

}
