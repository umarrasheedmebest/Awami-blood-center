import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitiesListPage } from './cities-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CitiesListPage,
  ],
  imports: [
    IonicPageModule.forChild(CitiesListPage),
    PipesModule
  ],
})
export class CitiesListPageModule {}
