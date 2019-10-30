import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  loginForm: FormGroup;
  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder) {
    this.createForm();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  createForm() {
    this.loginForm = this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendEmail() {
    if (this.auth.isOnline()) {
      let data = this.loginForm.value;

      if (!data.email) {
        this.auth.presentToast('Please enter email')
        return;
      }
      this.auth.showPleaseWaitLoading();
      this.auth.resetPassword(data.email)
        .then(
          (res) => {
            console.log('email sent', res);
            this.auth.dismissPleaseWaitLoading();
            this.navCtrl.setRoot(LoginPage);
          },
          error => {
            this.auth.presentToast('Invalid Email');
            this.auth.dismissPleaseWaitLoading();
          }
        );
    } else {
      this.auth.presentToast('Internet Connection Problem!');
    }
  }

}
