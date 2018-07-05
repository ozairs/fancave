import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController, PopoverController, } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PlayersProvider } from "../../providers/players/players";
import { Geolocation } from '@ionic-native/geolocation';

/**
 * class: PlayersPage
 * 
 * returns the top players from a given league
 */
@Component({
  selector: 'page-players',
  templateUrl: 'players.html'
})
export class PlayersPage {
  queryText: string = '';
  players: any[] = [];
  segment: String = 'nhl';

  /**
   * @constructor
   * @param navCtrl 
   * @param modalCtrl 
   * @param inAppBrowser 
   * @param playersData 
   * @param geolocation 
   * @param loadingCtrl 
   * @param popoverCtrl 
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public inAppBrowser: InAppBrowser, public playersData: PlayersProvider, public geolocation: Geolocation, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, private global: GlobalServiceProvider) {
  }


  /**
   * retrieve list of players when page loads
   */
  private ionViewDidLoad() {
    console.log("<< ionViewDidLoad");
    this.updatePlayers();
    console.log(">> ionViewDidLoad");
  }

  /**
   * retrieve list of players when page loads
   * @param button - currently selected league
   */
  private onSegmentChange(button: string): void {
    console.log(">> onSegmentChange");
    this.queryText = ''; //track the current search filter
    this.segment = button;
    
    this.updatePlayers();
    
    console.log("<< onSegmentChange");
  }

  /**
   * retrieve updated list of players based on search filter
   */
  public updatePlayers(): void {
    console.log('<< updatePlayers()');

    this.global.presentLoading();
    //get players list based on search filter and league
    this.playersData.getFilteredPlayers(this.segment, this.queryText.toLowerCase()).subscribe((players: any[]) => {
      this.global.closeLoading();
      //if no players return based on filter, manually set array length to clear
      if (players.length == 0) {
        this.players.length = 0;
      }
      //display filtered players
      else {
        this.players = players;
      }

    }, (error) => {
      console.log("Error connecting to service");
      this.global.closeLoading();
      this.global.presentConfirm('Error connecting to service')
    });
    console.log('>> updatePlayers()');
  }

}
