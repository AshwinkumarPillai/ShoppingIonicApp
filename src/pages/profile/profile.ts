import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Button } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  userData: any; // Facebook data

  Fbname: string;
  Fbemail: string;
  Fbdp: string;
  isFbLog: boolean = false;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private googlePlus: GooglePlus, 
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private storage: Storage
    ) {
  }

  ngOnInit() {
    this.fbDataLoaded();
  }

  fbDataLoaded() {
    this.storage.get('loggedIn').then((val) => {
      this.isFbLog = val;
    });

    this.storage.get('name').then((val) => {
      // alert('fbName value is : ' + val + 'Fbname : ' + this.Fbname + 'userData: ' + this.userData.picture);
      // console.log('fbName value is : ' + val + 'Fbname : ' + this.Fbname + 'userData: ' + this.userData.picture);
      this.Fbname = val;
      // alert('fbName value is : ' + val + 'Fbname : ' + this.Fbdp + 'userData: ' + this.userData.picture);
      // console.log('fbName value is : ' + val + 'Fbname : ' + this.Fbname + 'userData: ' + this.userData.picture);

    });

    this.storage.get('email').then((val) => {
     this.Fbemail = val;
    });

    this.storage.get('fbimage').then((val) => {
      // alert('fbIMage value is : ' + val + 'Fbdp : ' + this.Fbdp + 'userData: ' + this.userData.picture);
      this.Fbdp = val;
      // alert('fbIMage value is : ' + val + 'Fbdp : ' + this.Fbdp + 'userData: ' + this.userData.picture);
    });
  }

  onSignIn() {
    this.googlePlus.login({})
    .then(res => {
      console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        let toast = this.toastCtrl.create({
          message: 'Logged In Successfully!',
          duration: 1500
        });
        toast.present();
    })
    .catch(err => console.log(err));
  }

  LogOut() {
    this.googlePlus.logout().then((res) => {

      const alert = this.alertCtrl.create({
        title: 'Are You Sure you want to log Out?',
        message: 'This will remove your google account form the app. You can SignIn later',
        buttons: [
          {
            text: 'Log Out',
            handler: () => {
              
                this.displayName = null;
                this.email = null;
                this.familyName = null;
                this.givenName =null;
                this.userId = null;
                this.imageUrl = null;
                let toast = this.toastCtrl.create({
                  message: 'Logged Out Successfully!',
                  duration: 1500
                });
                toast.present();

            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

      alert.present();

    }).catch(err => console.log(err));
  }

  onFbSignIn() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      // console.log('logged in to Fb', res)
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        
        this.FbDataSet();
        
      })
    })
    .catch(err => console.log(err));
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  FbDataSet() {
    this.storage.set('name', this.userData.first_name).then(() => {
      this.storage.set('email', this.userData.email).then(() => {
        this.storage.set('fbimage', this.userData.picture).then(() => {
          this.storage.set('loggedIn', true).then(() => {
            this.fbDataLoaded();
          });
        });
      });
    });
    
  }

  FbLogOut() {
    this.fb.logout()
    .then(res => {
      console.log(res);
      const alert = this.alertCtrl.create({
        title: 'Are You Sure you want to log Out?',
        message: 'This will remove your FaceBook account form the app. You can SignIn later',
        buttons: [
          {
            text: 'Log Out',
            handler: () => {
              
                this.userData.first_name = null;
                this.userData.email = null;
                this.userData.picture = null;
                
               
                  this.storage.set('logged', false).then(() => {
                    this.FbDataSet();
                    this.fbDataLoaded();
                  });
             

                let toast = this.toastCtrl.create({
                  message: 'Logged Out Successfully!',
                  duration: 1500
                });
                toast.present();

            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

      alert.present();

    })
    .catch( err => console.log(err));
  }

}
