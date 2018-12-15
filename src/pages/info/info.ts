import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  detailImage: any;
  @ViewChild(Slides) slides: Slides;
  selectedLang: any;
  skipText: any;
  nextText: any;
  imageTips: any = [];
  //customer-ads-slider
  constructor(public platform: Platform, public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.imageTips = [
      {
        img:'assets/imgs/bloodDonorTips/25.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/27.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/19.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/20.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/21.png'
      },
      {
        img:'assets/imgs/bloodDonorTips/22.png'
      },
      {
        img:'assets/imgs/bloodDonorTips/23.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/24.png'
      },
      {
        img:'assets/imgs/bloodDonorTips/1.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/2.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/3.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/4.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/5.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/6.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/7.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/8.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/9.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/10.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/11.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/12.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/13.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/14.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/15.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/16.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/17.jpg'
      },
      {
        img:'assets/imgs/bloodDonorTips/18.jpg'
      }
    ];
  }

  getStarted() {
    this.navCtrl.setRoot(LoginPage, { lang: this.selectedLang });
  }

  slideChanged() {
    if (this.slides.isEnd()) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  slideNext() {
    if (this.slides.isEnd()) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.slides.slideNext();
    }
  }

  skipToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
