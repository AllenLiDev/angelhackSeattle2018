import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HikeOnePage } from '../pages/hike-one/hike-one';
import { HikeTwoPage } from '../pages/hike-two/hike-two';
import { HikeThreePage } from '../pages/hike-three/hike-three';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IbmWeatherProvider } from '../providers/ibm-weather/ibm-weather';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HikeOnePage,
    HikeTwoPage,
    HikeThreePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAR71-cZ_Nm6Av6III9NW239NMqCHKWlY0'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HikeOnePage,
    HikeTwoPage,
    HikeThreePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IbmWeatherProvider
  ]
})
export class AppModule {}
