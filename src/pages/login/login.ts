import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, EmailValidator } from "@angular/forms";
import { SignUpPage } from '../sign-up/sign-up';
import { AuthService } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook'
import { UserInfoPage } from '../user-info/user-info';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;
  constructor(public menuCtrl: MenuController, public facebook: Facebook, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
  }
  createForm() {
    this.loginForm = this.builder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  goToRegister() {
    this.navCtrl.push(SignUpPage)
  }

  login() {
    if (this.auth.isOnline()) {

		let data = this.loginForm.value;

		if (!data.email && !data.password) {
      this.auth.presentToast('Please enter both email and password')
			return;
		}

    this.auth.showPleaseWaitLoading();
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				(res) => {
          console.log('UserINfo', res);
          this.auth.dismissPleaseWaitLoading();
          this.navCtrl.setRoot(UserInfoPage);
        },
				error => {
          this.loginError = error.message
          this.auth.presentToast('Invalid Credentiols');
          this.auth.dismissPleaseWaitLoading();
        }
      );
    } else {
      this.auth.presentToast('Internet Connection Problem!');
    }
  }
  
  loginWithGoogle() {
    this.navCtrl.push(SignUpPage);
    // this.auth.nativeGoogleLogin()
    //   .then(
    //   	(res) => {
    //       console.log('UserINfo', res);
    //       this.navCtrl.setRoot(UserInfoPage);
    //     },
    //     error => console.log(error.message)
    //   );
  }

  facebookLogin() {
    if (this.auth.isOnline()) {

     this.facebook.login(["email", "public_profile"])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
            this.navCtrl.setRoot(UserInfoPage);
          });
  
      }).catch((error) => { console.log(error) });
  } else {
    this.auth.presentToast('Internet Connection Problem!');
  }
}

}
