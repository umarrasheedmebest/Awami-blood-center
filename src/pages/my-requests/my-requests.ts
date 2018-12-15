import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';

/**
 * Generated class for the MyRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRequestsPage');
    this.auth.presentToast('Coming Soon!');
  }

}
