import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HikingOnePage } from './hiking-one';

@NgModule({
  declarations: [
    HikingOnePage,
  ],
  imports: [
    IonicPageModule.forChild(HikingOnePage),
  ],
})
export class HikingOnePageModule {}
