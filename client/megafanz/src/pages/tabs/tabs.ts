import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ScoresPage } from './../scores/scores';
import { Component } from '@angular/core';
import { PlayersPage } from '../players/players';
import { TeamsPage } from '../teams/teams';
import { NewsPage } from '../news/news';
import { Events } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';

/**
 * class: TabsPage
 */
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage { 
  //list of tabs
  tab1Root = NewsPage;
  tab2Root = ScoresPage;
  tab3Root = PlayersPage;
  tab4Root = TeamsPage;

  /**
   * @constructor
   * @param global 
   * @param events 
   * @param authService 
   * @param storage 
   */
  constructor(
    private global : GlobalServiceProvider, 
    private events : Events,
    private authService: AuthServiceProvider,
    private storage: Storage) {
      console.log("<< TabsPage");
        //track if user has logged in to display popup menu

        //subscribe to login event
        this.events.subscribe('user:login', (evt) => {
          this.global.setLogin(true);
        });
        //subscribe to logout event
        this.events.subscribe('user:logout', (evt) => {
          this.global.setLogin(false);
        });
        console.log(">> TabsPage");
  }
 
  /**
   * check for access token from social provider
   */
  private ionViewDidLoad() {
    console.log("<< ionViewDidLoad");
      //check for access token from social provider in the browser url
      if (window.location.hash.indexOf("access_token") > 0) {
        this.authService.socialLoginCallback();
      }
      //check if user has successfully login (needed to display login/logout menu)
      else {
        this.storage.get('user').then((session) => {
          if (session) {
            this.global.setLogin(true);
          }    
        });
      }
      console.log(">> ionViewDidLoad");
  }
  
}
