import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

declare const google: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  pos: Pos[] = new Array();
  currentTripLocation: Cordonline[] = new Array();
  lastLoc: String;
  lastOnline: String;
  id: number;

  lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };
  linesGreen = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    strokeColor: '#292',
    scale: 4
  }

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }

  // on initialized, draw map and line and start tracking user location
  ngOnInit() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat: 0, lng: 0 }
    });

    var line = new google.maps.Polyline({
      path: [{lat: 22.291, lng: 153.027}, {lat: 18.291, lng: 153.027}],
      strokeOpacity: 0,
      icons: [{
        icon: this.lineSymbol,
        offset: '0',
        repeat: '20px'
      }],
      map: map
    });

    this.id = setInterval(() => {
      this.getLocation(map, line);
    }, 5000);

    this.pos.push({lat: 49.678697, lng: -123.154505});
  }

  // end tracking user location, and ask if can use data
  endHike(){
    this.endTracking();
    this.presentDataSheet();
  }

  // user lost and prompt for choice to safety
  lost(){
    this.endTracking();
    this.presentLostSheet();
  }

  ngOnDestroy() {
    this.endTracking();
  }

  // stops tracking user location
  endTracking(){
    if (this.id) {
      clearInterval(this.id);
    }
  }

  // gets user location and internet then adds to local array of saved info
  getLocation(map, line) {
    navigator.geolocation.getCurrentPosition(position => {
      var curPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var data = {
        cord: position.coords,
        online: navigator.onLine
      }

      this.currentTripLocation.push(data);
      //this.pos.push(curPos);


      //simulating hiking
      let tempPos = {
        lat: this.pos[this.pos.length - 1].lat + (Math.random() * 0.002 - 0.001),
        lng: this.pos[this.pos.length - 1].lng + (Math.random() * 0.002 - 0.001)
      }
      this.pos.push(tempPos);
      this.lastLoc = this.pos[this.pos.length - 1].lat.toString().substr(0, 10) + ", " + this.pos[this.pos.length - 1].lng.toString().substr(0,10);
      this.lastOnline = this.currentTripLocation[this.currentTripLocation.length - 1].online ? "online":"offline";

      //map.setCenter(curPos);
      map.setCenter(tempPos);
      line.setPath(this.pos);

      console.log(this.currentTripLocation);
      console.log(navigator.onLine);
    });
  }

  // presents data sheet for when user is lost
  presentLostSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'How can I help?',
      buttons: [
        {
          text: 'Back to Route',
          handler: () => {
            console.log('Back to route clicked');
          }
        },{
          text: 'Find Cellular Connection',
          handler: () => {
            console.log('Cellular clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // presents data sheet for when user is done hiking
  presentDataSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Can we use your data to better hiking safety?',
      buttons: [
        {
          text: 'Use my data to better Hiking Safety',
          handler: () => {
            console.log('Back to route clicked');
          }
        },{
          text: 'No, Not this time',
          handler: () => {
            console.log('Cellular clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

export interface Pos {
  lat: number,
  lng: number
}

export interface Cordonline {
  cord: Coordinates,
  online: boolean
}
