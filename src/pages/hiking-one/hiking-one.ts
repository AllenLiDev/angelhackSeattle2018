import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

declare const google: any;
/**
 * Generated class for the HikingOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hiking-one',
  templateUrl: 'hiking-one.html',
})
export class HikingOnePage {
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    // on initialized, draw map and line and start tracking user location
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat: 49.289444, lng: -122.940248 }
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
    }, 2000);

    // default for case 1
    this.pos.push({ lat: 49.289444, lng: -122.940248 });

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
            this.presentToast('Bettering Hiking safety :)');
          }
        }, {
          text: 'No, Not this time',
          handler: () => {
            this.presentToast('Feels Batman');
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  

  // gets user location and internet then adds to local array of saved info
  getLocation(map, line) {

    var success = (pos) => {
      // var curPos = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // };
      var data = {
        cord: pos.coords,
        online: navigator.onLine
      }

      this.currentTripLocation.push(data);
      // actual hiking
      // this.pos.push(curPos);


      // //simulating bad hiking
      // let tempPos = {
      //   lat: this.pos[this.pos.length - 1].lat + (Math.random() * 0.002 - 0.001),
      //   lng: this.pos[this.pos.length - 1].lng + (Math.random() * 0.002 - 0.001)
      // }
      // this.pos.push(tempPos);

      // simulated good hiking
      this.pos.push(this.simulationOne[this.simulatedCount]);
      this.lastLoc = this.pos[this.pos.length - 1].lat.toString().substr(0, 10) + ", " + this.pos[this.pos.length - 1].lng.toString().substr(0, 10);
      this.lastOnline = this.currentTripLocation[this.currentTripLocation.length - 1].online ? "online" : "offline";
      // actual hiking
      //map.setCenter(curPos);
      // simulated case 1
      map.setCenter(this.simulationOne[this.simulatedCount]);
      this.simulatedCount++;
      line.setPath(this.pos);
    }

    function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(success, onError, { maximumAge: 3000, timeout: 35000, enableHighAccuracy: true });
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