import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { TeamsProvider } from './../../providers/teams/teams';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ScoresPage } from "../scores/scores";
import moment from 'moment-timezone';

/**
 * class: TeamsPage
 * 
 * returns a set of professional sports teams for a given league, and select scores for a specific team
 */
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  //google map variables
  @ViewChild('mapCanvas') mapElement: ElementRef;
  private mapDOM: any;
  private map: google.maps.Map;
  public markers: google.maps.Marker[] = [];
  //track list vs map view
  private list_segment: any = true;
  private segment: any = 'nhl';
  // loading: any;
  public teams: any[];
  private today = moment().tz('America/Toronto').format('YYYY-MM-DD');
  
  /**
   * @constructor
   * @param navCtrl 
   * @param modalCtrl 
   * @param teamsProvider 
   * @param loadingCtrl 
   * @param popoverCtrl 
   * @param inAppBrowser 
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private teamsProvider: TeamsProvider, private global: GlobalServiceProvider) {
  }

  /**
   * when page loads, retrieve list of teams for a given league
   */
  public ionViewDidLoad() {
    console.log("<< ionViewDidLoad");
    console.log(">> ionViewDidLoad");
  }

  /**
   * retrieve list of teams when user selects a league 
   * @param button - current league
   */
  private onSegmentChange(button: string): void {
    console.log("<< onSegmentChange");
    console.log(">> onSegmentChange");
  }

}
