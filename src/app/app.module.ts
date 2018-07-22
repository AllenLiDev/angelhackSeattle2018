import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HikeOnePage } from '../pages/hike-one/hike-one';
import { HikeTwoPage } from '../pages/hike-two/hike-two';
import { HikingOnePage } from '../pages/hiking-one/hiking-one';
import { HikingTwoPage } from '../pages/hiking-two/hiking-two';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IbmWeatherProvider } from '../providers/ibm-weather/ibm-weather';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    HikeOnePage,
    HikeTwoPage,
    HikingOnePage,
    HikingTwoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    HikeOnePage,
    HikeTwoPage,
    HikingOnePage,
    HikingTwoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IbmWeatherProvider,
    Geolocation
  ]
})
export class AppModule {}
