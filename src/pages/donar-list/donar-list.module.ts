import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonarListPage } from './donar-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DonarListPage,
  ],
  imports: [
    IonicPageModule.forChild(DonarListPage),
    PipesModule
  ],
})
export class DonarListPageModule {}
