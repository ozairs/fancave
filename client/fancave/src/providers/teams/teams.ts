import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * class: TeamsProvider
 * returns a list of teams and scores for a given league
 */
@Injectable()
export class TeamsProvider {
  private teams: any = [];
  private scores: any;

  /**
   * @constructor
   * @param http 
   */
  constructor(public http: Http) {
    //initialize the scores array
    this.scores = {
      "mlb" : {
        "dates" : {}
        },
        "nba" : {
          "dates" : {}
        },
        "nhl" : {
          "dates" : {}
        },
        "nfl" : {
          "dates" : {}
        }
    };
  }

  /**
   * returns list of teams for a given league
   * @param league - name for a league
   */
  public getTeams(league): Observable<any> {
    console.log("<< getTeams");
    //if data has been populated then return it, otherwise retrieve it remotely
    if (this.teams[league] != undefined) {
      console.log(">> getTeams");
      return Observable.of(this.teams[league]);
    }
    else {
      console.log(">> getTeams");
      return this.http.get('/api/team/list?league=' + league)
      .timeout(20000)  
      .map((data) => {
          return this.teams[league] = data.json().teams.map(function (item) {
            //build the logo url for each team
            item['logo'] = data.json().metadata.logo + data.json().metadata.shortname + '/' + item.name.toLowerCase().split(' ').join('-') + '.svg';
            return item;
          }).sort(function (a, b) {
            //perform alphabetical support
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
              return -1
            if (nameA > nameB)
              return 1
            return 0 //default return value (no sorting)  
          });
        });
    }
  }

  /**
   * obtain list of scores for a given league and date. Force refetch of scores data using the @param refresh parameter
   * @param league - name for a league
   * @param date - date for scores
   * @param refresh - flag to fetch scores data again
   */
  public getScores(league, date, refresh): Observable<any> {
    console.log("<< getScores");
    //if data has been populated then return it, otherwise retrieve it remotely
    if (this.scores && this.scores[league] && this.scores[league].dates[date] && !refresh) {
      console.log(">> getScores");
      return Observable.of(this.scores[league].dates[date]);
    }
    else {
      console.log(">> getScores");
      return this.http.get('/api/team/scores?league=' + league + '&date=' + date)
      .timeout(20000)  
      .map((data) => {
          //initialize variables to allocate appropriate data structure (object vs array)
          var scoresData = {};
          scoresData[date] = [];
          //add team logo to each scores item
          var modScoresData = this.getTeamLogo(league, data.json());
          scoresData[date] = modScoresData;
          this.scores[league].dates = scoresData;
          return this.scores[league].dates[date];
        });
    }
  }

  /**
   * add a logo url to each team within the @param scores parameter
   * @param league - name for league
   * @param scores - array of scores 
   */
  private getTeamLogo(league, scores: Array<any>) {
    console.log("<< getTeamLogo")
    //return array with modified logo urls
    return scores.map(score => {
      //replace spaces with dash to normalize comparison
      var awayTeam = score.away.split(' ').join('-').toLowerCase();
      var homeTeam = score.home.split(' ').join('-').toLowerCase();

      //normalize any abbreviations within the team names
      awayTeam = awayTeam.split('la-')[1] || awayTeam.split('ny-')[1] || awayTeam.split('st.-')[1] || awayTeam;
      homeTeam = homeTeam.split('la-')[1] || homeTeam.split('ny-')[1] || homeTeam.split('st.-')[1] || homeTeam ;
      
      //find the fully qualified team name - matching against the team name in the scores param
      for (var i = 0; i < this.teams[league].length; i++) {
        //normalize match by replacing spaces with dashes in the teams array and compare against @param scores array
        if (this.teams[league][i].name.toLowerCase().split(' ').join('-').indexOf(awayTeam) >= 0) {
          score['awayLogo'] = score['awayLogo'].split(score.away.toLowerCase())[0] + this.teams[league][i].name.toLowerCase().split(' ').join('-') + '.svg';
        }
        else if (this.teams[league][i].name.toLowerCase().split(' ').join('-').indexOf(homeTeam) >= 0) {
          score['homeLogo'] = score['homeLogo'].split(score.home.toLowerCase())[0] + this.teams[league][i].name.toLowerCase().split(' ').join('-') + '.svg';
        }
      }
      console.log(">> getTeamLogo")
      return score;
    });
  }

}
