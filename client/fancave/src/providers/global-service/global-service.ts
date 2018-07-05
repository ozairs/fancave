import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/about/about-popover';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * set of global functions shared across components
 */
@Injectable()
export class GlobalServiceProvider {
  private loading: any;
  private login: boolean = false;
  private username: string = null;
  private popover: any;

  /**
   * @constructor
   * @param http 
   * @param alertCtrl 
   * @param popoverCtrl 
   * @param loadingCtrl 
   * @param inAppBrowser 
   */
  constructor(
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    public inAppBrowser: InAppBrowser
  ) 
  {}

  /**
   * opens a loading dialog
   */
  public presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'loading...'
    });
    this.loading.present();
  }

  /**
   * closes a loading dialog
   */
  public closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  /**
   * opens a menu dialog
   */
  public presentPopover(event: Event) {
    this.popover = this.popoverCtrl.create(PopoverPage, { data: this.login } );
    this.popover.present({ ev: event });
  }

  /**
   * closes a menu dialog
   */
  public closePopover() {
    if (this.popover) {
      this.popover.dismiss();
    }
  }

  /**
   * opens a confirmation dialog with buttons
   * @param message - message for the dialog
   */
  public presentConfirm(message) {
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: message,
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            setTimeout(1000);  
          }
        }
        // add more buttons via json
      ]
    });
    alert.present();
  }

  /**
   * opens a link to the built-in Web browser
   * @param url - url to open
   */
  public openLink(url: string) {
    this.inAppBrowser.create(url, '_blank');
  }

  /**
   * set the current login status in a synchronous manner avoiding the use of promises
   * @param status 
   */
  public setLogin(status, username) {
    this.username = username;
    return this.login = status;
  }

  /**
   * get the current login status in a synchronous manner avoiding the use of promises
   * @param status 
   */
  public getLogin() {
    return this.login;
  }

  /**
   * get the current login status in a synchronous manner avoiding the use of promises
   * @param status 
   */
  public getUsername() {
    return this.username;
  }

}
