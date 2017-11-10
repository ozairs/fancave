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
  mapDOM: any;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  //track list vs map view
  list_segment: any = true;
  segment: any = 'nhl';
  // loading: any;
  teams: any[];
  today = moment().tz('America/Toronto').format('YYYY-MM-DD');
  
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
    this.updateTeams();
    console.log(">> ionViewDidLoad");
  }

  /**
   * retrieve list of teams when user selects a league 
   * @param button - current league
   */
  private onSegmentChange(button: string): void {
    console.log("<< onSegmentChange");
    this.segment = button;
    this.updateTeams();
    console.log(">> onSegmentChange");
  }

  /**
   * switches between the map and the list view
   */
  private onViewChange() {
    console.log("<< onViewChange");
    if (this.list_segment) {
      this.updateTeams();
    }
    else {
      this.updateMap();
    }
    console.log(">> onViewChange");
  }

  /**
   * obtain the list of teams from the backend datasource
   */
  private updateTeams() {
    console.log("<< updateTeams");
    this.global.presentLoading();
    //call teams service
    this.teamsProvider.getTeams(this.segment).subscribe((teams: any) => {
      this.teams = teams;
      //current view is map
      if (!this.list_segment) {
        this.updateMap();
      }
      this.global.closeLoading();
    });
    console.log(">> updateTeams");
  }

  /**
   * opens google map with location pins to sports teams for the selected league
   */
  private updateMap() {
    console.log("<< updateMap");
    //no teams available
    if (this.teams.length < 0) return;

    //map is already initialized so remove markers (will refresh markers later)
    if (this.mapDOM) {
      for (var i=0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }
    //initialize map (will add markers later)
    else {
      this.mapDOM = this.mapElement.nativeElement;
      this.map = new google.maps.Map(this.mapDOM, {
        center: new google.maps.LatLng(41.850033, -87.6500523),
        zoom: 4
      });
    }

    //iterate over the teams array and create a marker
    this.teams.forEach((team: any, index) => {

      //create map marker for each team with additional metadata
      let marker = new google.maps.Marker({
        position: { lat: team.lat, lng: team.long },
        map: this.map,
        title: team.name,
        animation: google.maps.Animation.DROP,
      });

      //create the team card for the pin when selected
      var content = `<div id="content">` +
        `<div id="siteNotice">` +
        `</div>` +
        `<h1 id="firstHeading" class="firstHeading">${team.name}</h1>` +
        `<h4 id="secondHeading" class="secondHeading">${team.city}</h4>` +
        `<p id="thirdHeading" class="thirdHeading"><b>${team.arena}</b></p>` +
        `<div id="bodyContent">` + `<div style="float:center; width:100%;"><img src="${team.arena_img}" width="120" height="80"/></div>` +
        `</div>` +
        `</div>`;

      //create the info window for google maps
      let infoWindow = new google.maps.InfoWindow({content: content});

      //attach the info window to the market when selected
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      //add marker to markers array - track the markers seperately so we can remove them when 
      //viewing a map where the pins change because a different league is selected
      this.markers.push(marker);

      //fix needed to display google maps correctly after initial initialization
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.mapDOM.classList.add('show-map');
      });
    });
    console.log(">> updateMap");
  }

  /**
   * helper function to generate an header based on the first character of a team such that all teams
   * with that start with the same character are grouped together
   * @param record - current team
   * @param recordIndex - current index in team array
   */
  private customHeader(record, recordIndex) {
    if (recordIndex > 0) {
      //create new header
      if (record.name.charAt(0) !== this.teams[recordIndex - 1].name.charAt(0)) {
        return true;
      } else {
        return false;
      }
    }
    //first entry 
    else {
      return true;
    }
  }

  /**
   * creates a modal to display scores for a selected team
   * @param league - selected league name
   * @param team - selected team name
   * @param date - selected data
   */
  private getScores(league, team, date) {
    console.log("<< getScores");
    let scoresModal = this.modalCtrl.create(ScoresPage, { league: league, team: team, date: date });
    scoresModal.present();
    console.log(">> getScores");
  }
}
