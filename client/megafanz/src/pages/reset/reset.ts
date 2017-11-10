import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, App } from 'ionic-angular';

/**
 * class: ResetPage
 * allows users to reset their password using the Auth0 authentication service
 */
@Component({
  selector: 'reset-page',
  templateUrl: 'reset.html'
})
export class ResetPage {
  resetForm: FormGroup;
  resetPage: any = { submit: false, status: ''}

  /**
   * @constructor
   * @param navCtrl 
   * @param formBuilder 
   * @param global 
   * @param authService 
   */
  constructor(
    public app: App,
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public global: GlobalServiceProvider,
    public authService: AuthServiceProvider) {
    //initialize form
    this.resetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-z-_@/.A-Z ]*'), Validators.required])]
    });

  }

  /**
   * performs password reset and checks status
   */
  public resetPassword(): void {
    console.log("<< resetPasword");
    this.resetPage.submit = true;
    this.resetPage.status = this.authService.changePassword(this.resetForm.controls.email.value);

    if (this.resetPage.status) {
      this.global.presentConfirm("Password reset request successful.", this.app.getRootNav().push('LoginPage'));
    }
    console.log(">> resetPasword");
  }

}
