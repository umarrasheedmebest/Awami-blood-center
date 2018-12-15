import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OthersRequestsPage } from './others-requests';

@NgModule({
  declarations: [
    OthersRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(OthersRequestsPage),
  ],
})
export class OthersRequestsPageModule {}
