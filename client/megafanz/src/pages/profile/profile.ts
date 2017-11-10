import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * class: ProfilePage
 * 
 * displays profile page from logged in user
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private user: any;
  /**
   * @constructor
   * @param navCtrl 
   * @param navParams 
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;
    if (this.user == 'undefined' || !this.user) console.error('Unable to find any user information');
  }

  
}
