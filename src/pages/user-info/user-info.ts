import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, ModalController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from '@angular/fire/database';
import { Events } from 'ionic-angular';
import firebase from "firebase";
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Storage } from '@ionic/storage';
import { CitiesListPage } from '../cities-list/cities-list';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  profileData: AngularFireObject<any>;
  loginForm: FormGroup;
  myDate: any;
  profilePic: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  area: any;
  uid: any;
  mypic: string;
  userInfo: any;
  maxDate: any;
  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController, private storage: Storage, private zone: NgZone, private cropService: Crop, private imagePicker: ImagePicker, public events: Events, public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder) {
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
    this.maxDate = new Date().toISOString();;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ionViewWillEnter() {
    if (this.auth.isOnline()) {
      this.getUserData();
    } else {
      this.storage.get('userInfo').then(value => {
        if (value) {
          this.userInfo = value;
          this.setUserData();
          this.events.publish('user:created', this.userInfo);
        } else {
          this.auth.presentToast('No Record found!');
        }
      });
    }

  }

  getUserData() {
    this.afAuth.authState.take(1).subscribe(data => {
      console.log(firebase.database().ref(`profile/${data.uid}`));
      this.uid = data.uid;
      firebase.database().ref(`profile/${data.uid}`).on('value', (snapshot) => {
        this.userInfo = snapshot.val();
        console.log('value', snapshot.val());
        if (this.userInfo) {
          this.storage.set('userInfo', this.userInfo);
          this.events.publish('user:created', this.userInfo);
          if (this.navParams.get('push')) {
            console.log('pushing............',this.navParams.get('push'));
            this.showAlert();
            this.setUserData();
          } else {
            console.log('esleeinnnnngggg............');
            if (this.navParams.get('data')) {
              this.setUserData();
            } else {
              this.navCtrl.setRoot(HomePage);
            }
          }
        }
      });
    });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'UserInfo Page',
      subTitle: 'Please update date field',
      buttons: ['OK']
    });
    alert.present();
  }

  createForm() {
    this.loginForm = this.builder.group({
      'mobile': ['', Validators.required],
      'area': ['', Validators.required],
      'bloodgroup': ['', Validators.required],
      'fullName': ['', Validators.required],
      'address': ['', Validators.required],
    });
  }

  createProfile() {
    if (this.auth.isOnline()) {

      if (this.loginForm.valid) {
        let data = this.loginForm.value;
        let credentials = {
          area: data.area,
          bloodGroup: data.bloodgroup,
          mobile: data.mobile,
          fullName: data.fullName,
          lastDonated: this.myDate,
          address: data.address,
          pic: this.profilePic ? this.profilePic : ''
        };

        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).set(credentials).then(() => {
            this.events.publish('user:created', credentials);
            this.storage.set('userInfo', this.userInfo);
            this.auth.presentToast('Profile Updated Successfully!');
           this.navCtrl.setRoot(HomePage);
          })
        })
      } else {
        console.log('Please fill all fields');
        this.auth.presentToast('Please fill all fields to update profile');
      }
    } else {
      this.auth.presentToast('Please connect to internet for Profile Update!');
    }
  }

  uploadImage(imageURI) {
    this.auth.showPleaseWaitLoading();
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(this.uid + 'imageName');
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            //console.log(snapshot.downloadURL);
            //this.profilePic = snapshot.downloadURL;
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
              // this.auth.presentToast('Image Successfully uploaded');
            });
          }, err => {
            reject(err);
          })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  openImagePickerCrop() {
    if (this.auth.isOnline()) {

      this.imagePicker.hasReadPermission().then(
        (result) => {
          if (result == false) {
            // no callbacks required as this opens a popup which returns async
            this.imagePicker.requestReadPermission();
          }
          else if (result == true) {
            this.imagePicker.getPictures({
              maximumImagesCount: 1
            }).then(
              (results) => {
                for (var i = 0; i < results.length; i++) {
                  this.cropService.crop(results[i], { quality: 75 }).then(
                    newImage => {
                      this.uploadImageToFirebase(newImage);
                    },
                    error => console.error("Error cropping image", error)
                  );
                }
              }, (err) => console.log(err)
            );
          }
        }, (err) => {
          console.log(err);
        });
    } else {
      this.auth.presentToast('Please connect to internet for Image Update!');
    }
  }

  uploadImageToFirebase(image) {
    image = normalizeURL(image);
    //uploads img to firebase storage
    this.uploadImage(image)
      .then(photoURL => {
        console.log('Uploaded Image URL', photoURL);
        this.profilePic = photoURL;
        this.auth.dismissPleaseWaitLoading();
        this.auth.presentToast('Image Successfully uploaded');
      })
  }

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

  setUserData() {
    this.loginForm.controls['mobile'].setValue(this.userInfo.mobile);
    this.loginForm.controls['area'].setValue(this.userInfo.area);
    this.loginForm.controls['bloodgroup'].setValue(this.userInfo.bloodGroup);
    this.loginForm.controls['fullName'].setValue(this.userInfo.fullName);
    this.loginForm.controls['address'].setValue(this.userInfo.address);
    this.profilePic = this.userInfo.pic;
    this.myDate = this.userInfo.lastDonated;
  }

  presentCityModal() {
    let profileModal = this.modalCtrl.create(CitiesListPage);
    profileModal.onDidDismiss(data => {
      console.log('city', data);
      if (data) {
        this.loginForm.controls['area'].setValue(data.city);
      }
    });
    profileModal.present();
  }
}
