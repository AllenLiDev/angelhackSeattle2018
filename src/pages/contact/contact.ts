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
  simulatedCount = 0;

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
  };

  // simulated good hiker
  simulationOne: Pos[] = [
    { lat: 49.289444, lng: -122.940248 },
    { lat: 49.289538, lng: -122.940078 },
    { lat: 49.289500, lng: -122.939928 },
    { lat: 49.289430, lng: -122.939848 },
    { lat: 49.289447, lng: -122.939574 },
    { lat: 49.289381, lng: -122.939370 },
    { lat: 49.289196, lng: -122.939204 },
    { lat: 49.288976, lng: -122.939193 },
    { lat: 49.288847, lng: -122.939263 },
    { lat: 49.288658, lng: -122.939091 },
    { lat: 49.288412, lng: -122.938488 },
    { lat: 49.288237, lng: -122.938558 },
    { lat: 49.288090, lng: -122.938630 },
    { lat: 49.287971, lng: -122.938850 },
    { lat: 49.287870, lng: -122.939311 },
    { lat: 49.287688, lng: -122.939644 },
    { lat: 49.287573, lng: -122.939837 },
  ];

  // simulated saved user data
  simulatedSavedData: Pos[] = [
    { lat: 49.678675, lng: -123.154519 },
    { lat: 49.678600, lng: -123.154489 },
    { lat: 49.678528, lng: -123.154462 },
    { lat: 49.678488, lng: -123.154451 },
    { lat: 49.678445, lng: -123.154435 },
    { lat: 49.678391, lng: -123.154408 },
    { lat: 49.678285, lng: -123.154392 },
    { lat: 49.678244, lng: -123.154407 },
    { lat: 49.678197, lng: -123.154399 },
    { lat: 49.678145, lng: -123.154399 },
    { lat: 49.678095, lng: -123.154391 },
    { lat: 49.678057, lng: -123.154386 },
    { lat: 49.678017, lng: -123.154381 },
    { lat: 49.677974, lng: -123.154381 },
    { lat: 49.677934, lng: -123.154378 },
    { lat: 49.677891, lng: -123.154373 },
    { lat: 49.677841, lng: -123.154370 },
    { lat: 49.677312, lng: -123.154266 },
    { lat: 49.677034, lng: -123.154084 },
    { lat: 49.676853, lng: -123.153859 },
    { lat: 49.676714, lng: -123.153666 },
    { lat: 49.676547, lng: -123.153559 },
    { lat: 49.676228, lng: -123.153420 },
    { lat: 49.675825, lng: -123.153281 },
    { lat: 49.675762, lng: -123.152369 },
    { lat: 49.679525, lng: -123.149161 },
    { lat: 49.679129, lng: -123.148925 },
    { lat: 49.678421, lng: -123.148431 },
    { lat: 49.677928, lng: -123.147873 },
    { lat: 49.677324, lng: -123.147465 },
    { lat: 49.675859, lng: -123.151145 },
    { lat: 49.676213, lng: -123.149466 },
    { lat: 49.676824, lng: -123.148377 },
  ];

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }

  // on initialized, draw map and line and start tracking user location
  ngOnInit() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat: 0, lng: 0 }
    });

    var line = new google.maps.Polyline({
      path: [{ lat: 22.291, lng: 153.027 }, { lat: 18.291, lng: 153.027 }],
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

    // default for case 1
    // this.pos.push({ lat: 49.289444, lng: -122.940248 });

    // default for case 2
    this.pos.push({ lat: 49.678697, lng: -123.154505 });
  }

  // end tracking user location, and ask if can use data
  endHike() {
    this.endTracking();
    this.presentDataSheet();
  }

  // user lost and prompt for choice to safety
  lost() {
    this.endTracking();
    this.presentLostSheet();
  }

  ngOnDestroy() {
    this.endTracking();
  }

  // stops tracking user location
  endTracking() {
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
      // actual hiking
      // this.pos.push(curPos);


      //simulating bad hiking
      let tempPos = {
        lat: this.pos[this.pos.length - 1].lat + (Math.random() * 0.002 - 0.001),
        lng: this.pos[this.pos.length - 1].lng + (Math.random() * 0.002 - 0.001)
      }
      this.pos.push(tempPos);

      // simulated good hiking
      // this.pos.push(this.simulationOne[this.simulatedCount]);

      this.lastLoc = this.pos[this.pos.length - 1].lat.toString().substr(0, 10) + ", " + this.pos[this.pos.length - 1].lng.toString().substr(0, 10);
      this.lastOnline = this.currentTripLocation[this.currentTripLocation.length - 1].online ? "online" : "offline";

      // actual hiking
      //map.setCenter(curPos);

      // case 2
      map.setCenter(tempPos);

      // case 1
      // map.setCenter(this.simulationOne[this.simulatedCount]);
      // this.simulatedCount++;
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
        }, {
          text: 'Find Cellular Connection',
          handler: () => {
            console.log('Cellular clicked');
          }
        }, {
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
            console.log('Bettering Hiking safety :)');
          }
        }, {
          text: 'No, Not this time',
          handler: () => {
            console.log('Feels Batman');
          }
        }, {
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
