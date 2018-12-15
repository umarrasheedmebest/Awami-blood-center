import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DonarDetailPage } from '../donar-detail/donar-detail';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import firebase from "firebase";
import { CallNumber } from '@ionic-native/call-number';
import { AuthService } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import * as moment from 'moment';

/**
 * Generated class for the DonarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donar-list',
  templateUrl: 'donar-list.html',
})
export class DonarListPage {
  public donars = [];
  query: any;
  bloodgroup: any;
  area: any;
  search: boolean = false;
  constructor(private sqlite: SQLite, private storage: Storage, public auth: AuthService, private callNumber: CallNumber, private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    // this.donars = this.afDatabase.list('/profile');
    // console.log('donars', this.donars);
    if (this.auth.isOnline()) {
      if (this.navParams.get('donars')) {
        this.donars = this.navParams.get('donars');
      } else {
        firebase.database().ref(`/profile`).on('value', (snapshot) => {
          let list = snapshot.val();
          console.log('Data', snapshot.val());
          this.zone.run(() => {
            for (var key in list) {
              this.donars.push(list[key]);
            }
          }, error => {
          });
        });
      }

    } else {
      this.area = this.navParams.get('area');
      this.bloodgroup = this.navParams.get('bloodgroup');
      if(this.navParams.get('search')) {
        this.search = true;
      }
      this.getAllBrands();
      // this.storage.get('donarsLis').then(value => {
      //   if (value) {
      //     console.log('donars', value);
      //     //this.donars = value;
      //     this.getDonars(value);
      //   } else {
      //     this.auth.presentToast('No Record');
      //   }
      // })
    }

  }

  getDonars(data) {
    for (let key in data) {
      let valSign = data[key];
      this.donars.push(valSign);
    }
    this.filterResponse();
  }

  filterResponse() {
    if(this.search) {
      this.donars = this.donars.filter(item => item.bloodGroup == this.bloodgroup && item.area == this.area);
      console.log('Filtered Response', this.donars);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonarListPage');
  }

  viewDetail(donarDetail) {
    var date2 = new Date();
    let days = (moment(date2).diff(moment(donarDetail.lastDonated), 'days'));
    if (days >= 90) {
      this.navCtrl.push(DonarDetailPage, { data: donarDetail });
    } else {
      this.auth.presentToast('Last time donated ' + days+ ' days ago');
    }
  }

  dialNumber(mobile, date1) {
    var date2 = new Date();
    let days = (moment(date2).diff(moment(date1), 'days'));
    if (days >= 90) {
      this.callNumber.callNumber(mobile, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    } else {
      this.auth.presentToast('Last time donated ' + days+ ' days ago');
    }
  }

  getAvailable(donarDetail) {
    var date2 = new Date();
    if ((moment(date2).diff(moment(donarDetail.lastDonated), 'days')) >= 90) {
       return true;
    } else {
      return false;
    }
  }


  getAllBrands() {
    this.sqlite.create({
      name: 'donarsList.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM donars", []).then((resp) => {
          console.log('select with specific id executed', resp);
          let brands;
          if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              brands = resp.rows.item(i);
            }
            brands = JSON.parse(brands.content);
            console.log('donars', brands);
            this.getDonars(brands);
          }
        });
      });
  }

}
