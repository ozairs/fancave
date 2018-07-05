import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ResetPage } from '../reset/reset'
import { SignupPage } from '../signup/signup'
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * class: LoginPage
 * 
 * provides login and signup capabilities for the application
 */
@IonicPage({
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  loginPage: any = { submit: false, error: '' } //track login page status

  /**
   * @constructor
   * @param navCtrl 
   * @param formBuilder 
   * @param authService 
   * @param events 
   * @param storage 
   * @param inAppBrowser 
   */
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthServiceProvider, public events: Events, private storage: Storage, public inAppBrowser: InAppBrowser) {
    //initialize the login form control
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-z-_@/.A-Z ]*'), Validators.required])],
      password: ['', Validators.required],
      rememberMe: []
    });
  }


  /**
   * load the login page if the user has not logged in, otherwise transition to the home page
   */
  public ionViewDidLoad() {
    console.log("<< ionViewDidLoad");
    //check local storage for user session
    this.storage.get('user').then((session) => {
      // note: session.rememberMe cannot be set for social login 
      //check if user object exists in local session and transition them to login page
      if (session && session.user && new Date().getTime() < session.expiry) {
        console.log('user %s has already logged in.', session.user.name);
        this.navCtrl.push(TabsPage);
      }
    });
    console.log(">> ionViewDidLoad");
  }

  /**
   * transition to the reset password page
   */
  public resetPassword(): void {
    console.log("<< resetPassword");
    this.navCtrl.push(ResetPage);
    console.log(">> resetPassword");
  }

  /**
   * transition to the signup page
   */
  public signup(): void {
    console.log("<< signup");
    this.navCtrl.push(SignupPage);
    console.log(">> signup");
  }

  /**
   * transition to the google login page
   */
  public googleLogin(): void {
    console.log("<< googleLogin()");

        //subscribe to login success and failure events
    //user login successful
    this.events.subscribe('user:login', (evt) => {
      //add rememberMe toggle value to the session
      this.storage.get('user').then((session) => {
        session.rememberMe = this.loginForm.controls['rememberMe'].value;
        this.storage.set('user', session);
      });  
      //console.log(evt);
      this.navCtrl.push(TabsPage)
    });

    //user login failure
    this.events.subscribe('user:error', (evt) => {
      this.loginPage.error = evt.description;
      this.loginForm.controls['password'].setValue('');
    });
    
    this.authService.socialLogin();
    console.log(">> googleLogin()");
  }

  /**
   * trigger login to authentication service and transition to home page upon success
   */
  public login(): void {
    console.log("<< login");
    this.loginPage.submit = true;
    // this.loginForm.controls.username.value, this.loginForm.controls.password.value;
    
    //subscribe to login success and failure events
    //user login successful
    this.events.subscribe('user:login', (evt) => {
      //add rememberMe toggle value to the session
      this.storage.get('user').then((session) => {
        session.rememberMe = this.loginForm.controls['rememberMe'].value;
        this.storage.set('user', session);
      });  
      //console.log(evt);
      this.navCtrl.push(TabsPage)
    });

    //user login failure
    this.events.subscribe('user:error', (evt) => {
      this.loginPage.error = evt.description;
      this.loginForm.controls['password'].setValue('');
    });

    //call login service with username and password entered in the form
    this.authService.
    login(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
    console.log(">> login");
  }

  /**
   * navigate to home page
   */
  public home(): void {
    this.navCtrl.push(TabsPage)
  }

}
