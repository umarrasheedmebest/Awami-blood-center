import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { InfoPage } from '../pages/info/info';
import { ReactiveFormsModule } from '@angular/forms';
import { DonarListPage } from '../pages/donar-list/donar-list';
import { DonarDetailPage } from '../pages/donar-detail/donar-detail';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserInfoPage } from '../pages/user-info/user-info';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DatePipe } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { CallNumber } from '@ionic-native/call-number';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyRequestsPage } from '../pages/my-requests/my-requests';
import { OthersRequestsPage } from '../pages/others-requests/others-requests';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { TypingAnimationDirective } from 'angular-typing-animation'
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CitiesListPage } from '../pages/cities-list/cities-list';
import { HelpPage } from '../pages/help/help';
import { TotalDonarPage } from '../pages/total-donar/total-donar';
import { OneSignal } from '@ionic-native/onesignal';


@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // LoginPage,
    // SignUpPage,
    // InfoPage,
    // DonarListPage,
    // DonarDetailPage,
    // UserInfoPage,
    // TimeAgoPipe,
    // MyRequestsPage,
    // OthersRequestsPage,
    // AboutUsPage,
    // TermsAndConditionsPage,
    // TypingAnimationDirective,
    // CitiesListPage,
    // HelpPage,
    // TotalDonarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    PipesModule,
    IonicStorageModule.forRoot()
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    InfoPage,
    DonarListPage,
    DonarDetailPage,
    UserInfoPage,
    MyRequestsPage,
    OthersRequestsPage,
    AboutUsPage,
    TermsAndConditionsPage,
    CitiesListPage,
    HelpPage,
    TotalDonarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth ,
    AuthService,
    Facebook,
    DatePipe,
    TimeAgoPipe,
    CallNumber,
    SpeechRecognition,    
    Crop,
    ImagePicker,
    PipesModule,
    Network,
    ScreenOrientation,
    SQLite,
    OneSignal
  ]
})
export class AppModule {}
