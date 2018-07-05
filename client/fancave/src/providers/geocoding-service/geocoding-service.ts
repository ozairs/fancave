import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Observer } from "rxjs/Observer";

/*
  Generated class for the GeocodingServiceProvider provider.

  https://github.com/robisim74/angular-maps/blob/master/app/services/geocoding.service.ts
*/
@Injectable()
export class GeocodingServiceProvider {
    geocoder: google.maps.Geocoder;
    mapData: any[] = [];
    maxData: number = 0;

    constructor(public http: Http) {
        console.log('Hello GeocodingServiceProvider Provider');
    }

    /**
       * Geocoding services.
       * 
       * Wraps the Google Maps API geocoding service into an observable.
       * 
       * @param address The address to be searched
       * @return An observable of GeocoderResult
       * Observable<any[]>
       */
    public codeAddress(players: any): any {
        this.maxData = players.array.length;
        this.geocoder = new google.maps.Geocoder();

        return new Observable((observer: Observer<any[]>) => {
            // console.log(">> codeAddress");

            // Invokes geocode method of Google Maps API geocoding.
            players.forEach( (player, index) => {

                this.geocoder.geocode({ 'address': player.birthplace }, (
                    (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            // console.log("google geocode results %s", JSON.stringify(results));
                            var playerData = {};
                            playerData['id'] = player.id + '';
                            playerData['location'] = results[0].geometry.location;
                            console.log('pushing player id with geo data %s', JSON.stringify(playerData));
                            this.mapData.push(playerData);

                            //check if its the last element in the array
                            if(this.mapData.length == this.maxData) {
                                // console.log("google geocode array %s", JSON.stringify(this.mapData));
                                observer.next(this.mapData);
                                observer.complete();
                            }

                        } else {
                            console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                            observer.error(status);
                        }
                    })
                );
            })//players.forEach
            
        });
    }
}