import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  private user: firebase.User;
  loading: any;
  constructor(private network: Network, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }


  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithGoogle(): Promise<any> {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then((result: any) => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }

  showPleaseWaitLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait a moment',
      cssClass: 'my-loading-class'
    });
    this.loading.present();
  }

  dismissPleaseWaitLoading() {
    this.loading.dismissAll();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom',
        dismissOnPageChange: true,
        cssClass: "toast-controller"
    });

    toast.onDidDismiss(() => {
        console.log('Dismissed toast');
    });

    toast.present();
}

resetPassword(email: string) {
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

isOnline(): boolean {

  if(this.network.type !== 'none'){
      return true;
  }else if(this.network.type === 'none'){
     // alert('Please Check your network and try again');
  }else{
      //alert('Please Check your network and try again');
  }
}

}
