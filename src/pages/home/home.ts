import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operator/debounceTime";
import { DonarListPage } from '../donar-list/donar-list';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database/interfaces';
import { Observable } from 'rxjs-compat';
import { AuthService } from '../../providers/auth/auth';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import firebase from "firebase";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MenuController, ModalController } from 'ionic-angular';
import { CitiesListPage } from '../cities-list/cities-list';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchControl: FormControl;
  searchTerm: string = '';
  imageTips: any = [];
  area: any;
  bloodgroup: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(public navParams: NavParams, public modalCtrl: ModalController, public menuCtrl: MenuController, private sqlite: SQLite, private storage: Storage, private speechRecognition: SpeechRecognition, public auth: AuthService, private zone: NgZone, public navCtrl: NavController, private afDatabase: AngularFireDatabase) {
    this.searchControl = new FormControl();
    console.log('Donars', this.afDatabase.list('/profile'));
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    console.log('Message', this.navParams.get('message'));
  }

  ionViewDidLoad() {
    //   this.searchControl.valueChanges.debounceTime(900).subscribe(search => {
    //     console.log('value changes');
    //     this.searchDonar();
    // });
    this.menuCtrl.enable(true);

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

    this.createDbAndTables();
  }

  startRecognition() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        console.log('hasPermission', hasPermission);
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => {
                console.log('Granted');
                this.recordListening();
              },
              () => console.log('Denied')
            )
        } else {
          this.recordListening();
        }

      });
  }

  recordListening() {
    this.auth.presentToast('Please Speack now!');
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log('Match=>', matches);
          this.SpeachSearch(matches[0])
        },
        (onerror) => console.log('error:', onerror)
      )
  }
  
  searchDonars() {
    let count = 0;
    console.log('this.bloodgroup', this.bloodgroup);
    if (this.area && this.bloodgroup) {
      if (this.auth.isOnline()) {
        this.auth.showPleaseWaitLoading();
        this.usersRef = this.afDatabase.list('profile',
          ref => ref.orderByChild('area').equalTo(this.area));
        this.usersRef.valueChanges().subscribe((res: any) => {
          this.auth.dismissPleaseWaitLoading();
          if (res.length > 0) {
            let donars = res.filter(item => item.bloodGroup == this.bloodgroup);
            console.log('Filter Response', donars);
            console.log('count', count++);
            if (donars.length > 0) {
              this.navCtrl.push(DonarListPage, { donars: donars });
            } else {
              this.auth.presentToast('No record found!');
            }
          } else {
            this.auth.presentToast('No record found!');
          }
        }, error => {
          this.auth.dismissPleaseWaitLoading();
        });
      } else {
        this.navCtrl.push(DonarListPage, { bloodgroup: this.bloodgroup, area: this.area, search: true });
      }
    } else {
      this.auth.presentToast('Please Select Area and Blood Group!');
    }
  }


  // User google autocomplete search
  updateSearchResults() {
    console.log('called', this.autocomplete.input);
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    console.log('selected Result', item.description);
    this.autocomplete.input = item.description;
    this.area = this.autocomplete.input;
    this.autocompleteItems = [];
  }

  SpeachSearch(bloodGroup) {
    this.auth.showPleaseWaitLoading();
    this.usersRef = this.afDatabase.list('profile',
      ref => ref.orderByChild('bloodGroup').equalTo(bloodGroup));
    this.usersRef.valueChanges().subscribe((res: any) => {
      console.log('response', res);
      this.auth.dismissPleaseWaitLoading();
      if (res.length > 0) {
        this.navCtrl.push(DonarListPage, { donars: res });
      } else {
        this.auth.presentToast('No record found!');
      }
    }, error => {
      this.auth.dismissPleaseWaitLoading();
    });
  }

  storeDataLocally() {
    if (this.auth.isOnline()) {
      firebase.database().ref(`/profile`).on('value', (snapshot) => {
        let list = snapshot.val();
        // this.storage.set('donarsLis', list);
        this.saveDonars(list);
        console.log('Data', snapshot.val());
      });
    }
  }

  createDbAndTables() {
    this.sqlite.create({
      name: 'donarsList.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        //Locations
        db.executeSql('create table if not exists donars (content text)', [])
          .then(() => {
            console.log('donars  Table Created');
            this.storeDataLocally();
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  saveDonars(data) {
    let locations = "INSERT OR REPLACE INTO donars VALUES (?)";
    this.sqlite.create({
      name: 'donarsList.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(locations, [JSON.stringify(data)]).then((data) => {
          console.log('locations inserted successfully');
        }, (error) => {
          console.log('insertion error', error);
        });

      });
  }

  presentCityModal() {
    let profileModal = this.modalCtrl.create(CitiesListPage);
    profileModal.onDidDismiss(data => {
      console.log('city',data);
      if(data) {
        this.area = data.city;
      }
    });
    profileModal.present();
  }
 
}
