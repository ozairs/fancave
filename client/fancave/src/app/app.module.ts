import { ScoresPage } from './../pages/scores/scores';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FanCaveApp } from './app.component';
import { HttpModule } from '@angular/http';

import { PopoverPage } from '../pages/about/about-popover';
import { TeamsPage } from '../pages/teams/teams';
import { PlayersPage } from '../pages/players/players';
import { NewsPage } from '../pages/news/news';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPage } from '../pages/reset/reset';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { PlayersProvider } from '../providers/players/players';
import { GeocodingServiceProvider } from '../providers/geocoding-service/geocoding-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NewsProvider } from '../providers/news/news';
import { TeamsProvider } from '../providers/teams/teams';
import { GlobalServiceProvider } from '../providers/global-service/global-service';

@NgModule({
  declarations: [
    FanCaveApp,
    PlayersPage,
    TeamsPage,
    NewsPage,
    TabsPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    ResetPage,
    ScoresPage,
    PopoverPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    PasswordStrengthBarModule,
    IonicModule.forRoot(FanCaveApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ResetPage, name: 'ResetPage', segment: 'reset' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FanCaveApp,
    PlayersPage,
    TeamsPage,
    NewsPage,
    TabsPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    ResetPage,
    ScoresPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    InAppBrowser,
    PlayersProvider,
    GeocodingServiceProvider,
    Geolocation,
    NewsProvider,
    TeamsProvider,
    GlobalServiceProvider
  ]
})
export class AppModule {}
