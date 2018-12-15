import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonarDetailPage } from './donar-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DonarDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DonarDetailPage),
    PipesModule
  ],
})
export class DonarDetailPageModule {}
