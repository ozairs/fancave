import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPage } from '../pages/reset/reset';
import { ProfilePage } from '../pages/profile/profile';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class FanCaveApp {
  loggedInPages: PageInterface[] = [
		{ title: 'Profile', name: 'ProfilePage', component: ProfilePage, icon: 'person' },
		{ title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
	];
	loggedOutPages: PageInterface[] = [
		{ title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' },
    { title: 'Reset Password', name: 'ResetPage', component: ResetPage, icon: 'person-add' }
  ]
  rootPage:any = TabsPage;
  // rootPage:any = LoginPage;
  // the root nav is a child of the root app component
  @ViewChild(Nav) nav: Nav;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
