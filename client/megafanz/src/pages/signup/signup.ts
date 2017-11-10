import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, Events} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { PasswordValidator } from './password';

/**
 * class: SignupPage
 * 
 * create new user account using Auth0 authentication service
 */
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  signupPage: any = { submit: false, error: ''}

  /**
   * @constructor
   * @param navCtrl 
   * @param formBuilder 
   * @param authService 
   * @param events 
   */
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthServiceProvider, public events: Events) {
    //initialize form with validators
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-z-_@/.A-Z ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.required, PasswordValidator.passwordStrength])],
      password2: ['', Validators.compose([Validators.required, PasswordValidator.isValid])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }

  /**
   * navigate to home page
   */
  public home(): void {
    this.navCtrl.push(TabsPage)
  }

  /**
   * perform signup using information from web form
   */
  public signup(): void {
    console.log("<< signup");
    this.signupPage.submit = true;
    
    //subscribe to login event since successful signup triggers automatic login
    this.events.subscribe('user:login', (evt) => {
      this.navCtrl.push(TabsPage, { 
        //pass name-value pairs
      })
    });

    //subscribe to signup error event and display error message
    this.events.subscribe('user:error', (evt) => {
      console.log(evt.description);
      this.signupPage.error = evt.description;
      this.signupForm.controls['password'].setValue('');
    });

    //perform signup using Auth0 authentication service
    this.authService.signup(this.signupForm.controls.username.value, 
      this.signupForm.controls.password.value, 
      this.signupForm.controls.firstName.value, 
      this.signupForm.controls.lastName.value);
    
    console.log(">> signup");
  }

}
