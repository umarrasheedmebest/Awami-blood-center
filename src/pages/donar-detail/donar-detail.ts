import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import * as moment from 'moment';
import { AuthService } from '../../providers/auth/auth';

/**
 * Generated class for the DonarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donar-detail',
  templateUrl: 'donar-detail.html',
})
export class DonarDetailPage {
  donarDetail: any;
  constructor(public auth: AuthService, private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams) {
   this.donarDetail = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonarDetailPage');
  }

  dialNumber(mobile, date1) {
    var date2 = new Date();
    if ((moment(date2).diff(moment(date1), 'days')) >= 90) {
      this.callNumber.callNumber(mobile, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } else {
      this.auth.presentToast('Already donated on ' + date1);
    }
  }
}
