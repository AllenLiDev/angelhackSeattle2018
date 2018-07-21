import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  lat: number;
  lng: number;
  id: number;
  currentTripLocation: Coordinates[] = new Array();

  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.getLocation();
  }
  
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  startHike(){
    this.id = setInterval(() => {
      this.getLocation();
    }, 5000);
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.currentTripLocation.push(position.coords);
    });
  }

}
