import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AuthService } from '../../providers/auth/auth';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the TotalDonarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-total-donar',
  templateUrl: 'total-donar.html',
})
export class TotalDonarPage {
  public donars = [];
  aPos: any;
  aNeg: any;
  bPos: any;
  bNeg: any;
  oPos: any;
  oNeg: any;
  abPos: any;
  abNeg: any;
  total: any;
  constructor(private sqlite: SQLite, private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TotalDonarPage');
    if (this.auth.isOnline()) {
      firebase.database().ref(`/profile`).on('value', (snapshot) => {
        let list = snapshot.val();
        this.zone.run(() => {
          this.pushListOfDonar(list);
        }, error => {
        });
      });
    } else {
      this.getAllBrands();
    }
  }

  getBloodGroupDetail(list) {
    this.zone.run(() => {
      this.aPos = list.filter(item => item.bloodGroup == 'A+');
      this.aNeg = list.filter(item => item.bloodGroup == 'A-');
      this.bPos = list.filter(item => item.bloodGroup == 'B+');
      this.bNeg = list.filter(item => item.bloodGroup == 'B-');
      this.abPos = list.filter(item => item.bloodGroup == 'AB+');
      this.abNeg = list.filter(item => item.bloodGroup == 'AB-');
      this.oPos = list.filter(item => item.bloodGroup == 'O+');
      this.oNeg = list.filter(item => item.bloodGroup == 'O-');
    }, error => {
    });
  }

  pushListOfDonar(list) {
    for (var key in list) {
      this.donars.push(list[key]);
    }
    console.log('List', this.donars);
    console.log('Total', this.donars.length);
    this.getBloodGroupDetail(this.donars);
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
            this.pushListOfDonar(brands);
          }
        });
      });
  }
}
