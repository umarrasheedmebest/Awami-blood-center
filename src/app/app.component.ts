import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { InfoPage } from '../pages/info/info';
import { DonarListPage } from '../pages/donar-list/donar-list';
import { AuthService } from '../providers/auth/auth';
import { UserInfoPage } from '../pages/user-info/user-info';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase";
import { MyRequestsPage } from '../pages/my-requests/my-requests';
import { OthersRequestsPage } from '../pages/others-requests/others-requests';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HelpPage } from '../pages/help/help';
import { TotalDonarPage } from '../pages/total-donar/total-donar';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;//= TotalDonarPage;
  userData: any;
  isPush: boolean = false;
  pages: Array<{ title: string, component: any }>;

  constructor(private oneSignal: OneSignal, private alertCtrl: AlertController, private screenOrientation: ScreenOrientation, private storage: Storage, public afAuth: AngularFireAuth, public events: Events, public auth: AuthService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.subscribeEvent();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'All Donars', component: DonarListPage },
      { title: 'Blood Group Counts', component: TotalDonarPage },
      { title: 'My Blood Requests', component: MyRequestsPage },
      { title: 'Blood Requests', component: OthersRequestsPage },
      { title: 'Settings', component: UserInfoPage },
      { title: 'Help', component: HelpPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Terms and Conditions', component: TermsAndConditionsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.oneSignalPush();
      if (this.auth.isOnline()) {
        this.afAuth.authState.take(1).subscribe(data => {
          if (data) {
            firebase.database().ref(`profile/${data.uid}`).on('value', (snapshot) => {
              let value = snapshot.val();
              console.log('value', snapshot.val());
              if (value) {
                this.events.publish('user:created', value);
                if(!this.isPush) {
                  this.rootPage = HomePage;
                }
              } else {
                this.rootPage = LoginPage;
              }
            });
          } else {
            this.rootPage = InfoPage;
          }
        },
          () => {
            this.rootPage = InfoPage;
          });
      } else {
        this.storage.get('userInfo').then(value => {
          if (value) {
            this.events.publish('user:created', value);
            this.rootPage = HomePage;
          } else {
            this.rootPage = InfoPage;
          }
        });
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, { data: true });
  }

  subscribeEvent() {
    this.events.subscribe('user:created', (user) => {
      console.log('userData', user);
      this.userData = user;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  openSettings() {
    this.nav.push(UserInfoPage, { data: true });
  }

  oneSignalPush() {
    this.oneSignal.startInit('eebba080-72a6-48e5-9f1c-89d602419f40', '926099624994');

   // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      console.log("push notification opened");

    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      this.isPush = true;
      this.showPrompt();
    });

    this.oneSignal.endInit();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Have you donated blood Recently ?',
      message: "Please click yes if you donated otherwise click no",
      buttons: [
        {
          text: 'NO',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.nav.push(UserInfoPage, { push: true });
          }
        }
      ]
    });
    prompt.present();
  }
}

