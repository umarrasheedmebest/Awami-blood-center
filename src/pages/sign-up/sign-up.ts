import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UserInfoPage } from '../user-info/user-info';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

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
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    // {
    //   'email': ['', Validators.required],
    //   'password': ['', Validators.required],
    //   // 'mobile':['', Validators.required],
    //   // 'area': ['', Validators.required],
    //   // 'bloodgroup': ['', Validators.required]
    // }
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  signup() {
    if (this.auth.isOnline()) {

    if (this.loginForm.valid) {
      this.auth.showPleaseWaitLoading();
      let data = this.loginForm.value;
      let credentials = {
        email: data.email,
        password: data.password
      };
      this.auth.signUp(credentials).then(
        (res) => {
          console.log(res);
          this.auth.dismissPleaseWaitLoading();
          this.navCtrl.setRoot(UserInfoPage);
        }, error => {
          this.auth.presentToast('Something went wrong!');
          this.auth.dismissPleaseWaitLoading();
        }
      );
    } else {
      this.auth.presentToast('Please Enter Email and Password');
    }
  } else {
    this.auth.presentToast('Internet Connection Problem!');

  }
  }
}
