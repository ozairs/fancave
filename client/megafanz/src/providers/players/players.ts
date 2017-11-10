import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { GeocodingServiceProvider } from '../geocoding-service/geocoding-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';

/**
 * class: PlayersProvider
 * 
 * returns a list of players for a given league
 */
@Injectable()
export class PlayersProvider {
  data: any[] = [];
  // mapData: Array<any>;

  /**
   * 
   * @param http - request module
   * @param geocode - obtain geocoordinate based on location information
   */
  constructor(public http: Http, public geocode: GeocodingServiceProvider) {
  }

  /**
   * retreives a set of players for a requested league
   * @param league - name of league
   */
  public getPlayers(league): any {
    console.log("<< getPlayers");
    //if data has been populated then return it, otherwise retrieve it remotely
    if (this.data[league] != undefined) {
      console.log(">> getPlayers");
      return Observable.of(this.data[league]);
    }
    else {
      //return list of players
      console.log(">> getPlayers");
      return this.http.get('/api/player/list?league=' + league)
        .map((data) => this.data[league] = data.json().sort(function (a, b) {
          //sort the list of players in alphabetical order
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)  
        })
      );
    }
  }

  /**
   * return the list of players for the requested league based on a filter that matches the players
   * @param league - requested league name
   * @param filter - string that contains matching criterial to return list of players
   */
  public getFilteredPlayers(league, filter): Observable<any> {
    console.log("<< getFilteredPlayers");
    return this.getPlayers(league)
      .concatMap(arr => Observable.from(arr))
      .filter(p => {
        console.log(">> getFilteredPlayers");
        return p.name.toLowerCase().indexOf(filter) >= 0 || p.team.toLowerCase().indexOf(filter) >= 0
      }).toArray();
  }

  /**
   * return list of geo-coordinates for each players location
   * @param league - requested league name
   */
  // public getPlayersGeo(league): Observable<any[]> {

  //   if (this.mapData) {
  //     return Observable.from(this.mapData);
  //   }
  //   else {
  //     return new Observable((observer: Observer<any[]>) => {
  //       //perform geocoding for each player
  //       this.geocode.codeAddress(this.getPlayers(league)).subscribe((result) => {
  //         this.mapData = result;
  //         observer.next(result);
  //         observer.complete();
  //       });
  //     });
  //   }//else
  // }
}
