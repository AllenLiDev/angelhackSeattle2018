import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HikeOnePage } from './hike-one';

@NgModule({
  declarations: [
    HikeOnePage,
  ],
  imports: [
    IonicPageModule.forChild(HikeOnePage),
  ],
})
export class HikeOnePageModule {}
