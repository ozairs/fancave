import { Component } from '@angular/core';
import { App, NavParams, ViewController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProfilePage } from '../profile/profile';

/**
 * Class: PopoverPage
 * 
 * creates a popup page that dynamically displays menu based on whether the user is logged in
 * 
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about-popover.html'
})
export class PopoverPage {
  private isLogin: boolean;
  /**
   * 
   * @constructor
   * @param app 
   * @param authService 
   */
  constructor(public app: App, public authService: AuthServiceProvider, public viewCtrl: ViewController, public navParams: NavParams) { 
      console.log(">> PopoverPage");
      this.isLogin = navParams.get('data');
  }

  /**
   * perform logout and transitions to login page
   */
  private logout() {
    console.log("<< logout");
    this.viewCtrl.dismiss();
    //trigger logout
    this.authService.logout();
    console.log(">> logout");
  }

  /**
   * performs login and transitions to login page
   */
  private login() {
    console.log("<< login");
    this.viewCtrl.dismiss();
    this.app.getRootNav().push('LoginPage');
    console.log(">> login");
  }

  /**
   * displays profile page
   * 
   */
  private profile() {
    console.log("<< profile");
    this.viewCtrl.dismiss();
    this.authService.getSession().then( (user) => {
      this.app.getRootNav().push(ProfilePage, user);      
    });
    console.log(">> profile");
  }

}