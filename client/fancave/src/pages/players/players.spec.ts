import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlayersPage } from './players';

import { PlayersProviderMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { Observable } from 'rxjs/Observable';
import { PlayersProvider } from '../../providers/players/players';

let component: PlayersPage;
let fixture: ComponentFixture<PlayersPage>;
let debug: DebugElement;
let debugList: DebugElement[];
let element: HTMLElement;

describe('Page: Players Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, PlayersPage], //component to test
 
            providers: [
				NavController,
				InAppBrowser,
				Geolocation,
                {
                    provide: PlayersProvider,
                    useClass: PlayersProviderMock
                },
                {
                    provide: Storage,
                    useClass: StorageMock
                },
                {
                    provide: GlobalServiceProvider,
                    useClass: GlobalServiceProviderMock
                }
            ],
 
            imports: [
                IonicModule.forRoot(FanCaveApp)
            ]
 
        }).compileComponents();
 
    }));
    
    //create the component instance
    beforeEach(() => {
 
        fixture = TestBed.createComponent(PlayersPage); //component
        component = fixture.componentInstance; //instance

    });
  
    //invoke the test case (call provider and display data inside view)
    it('displays all nhl players', () => {
        
		//get the data
		var playersService = fixture.debugElement.injector.get(PlayersProvider);
		playersService.getFilteredPlayers('nhl', '').subscribe( (players) => {
			component.players = players;
		});

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item ion-label h2'));
        element = debug.nativeElement;
        //assert data is on the page
		expect(element.textContent).toContain('Edmonton Oilers'); 
		
		var debugList = fixture.debugElement.queryAll(By.css('ion-card'));
		expect(debugList.length).toBeGreaterThan(1); 
    });

    it('displays all nba players', () => {
        
		//get the data
		var playersService = fixture.debugElement.injector.get(PlayersProvider);
		playersService.getFilteredPlayers('nba', '').subscribe( (players) => {
			component.players = players;
		});

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item ion-label h2'));
        element = debug.nativeElement;
        //assert data is on the page
		expect(element.textContent).toContain('Oklahoma City Thunder'); 
		
		var debugList = fixture.debugElement.queryAll(By.css('ion-card'));
		expect(debugList.length).toBeGreaterThan(1); 
    });

    it('displays all mlb players', () => {
        
        //get the data
        var playersService = fixture.debugElement.injector.get(PlayersProvider);
        playersService.getFilteredPlayers('mlb', '').subscribe( (players) => {
			component.players = players;
		});
        
        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item ion-label h2'));
        element = debug.nativeElement;
		//assert data is on the page
		expect(element.textContent).toContain('Los Angeles Angels of Anaheim'); 
		
		var debugList = fixture.debugElement.queryAll(By.css('ion-card'));
		expect(debugList.length).toBeGreaterThan(1); 
    });
    
    it('displays all nfl players', () => {
        
        //get the data
        var playersService = fixture.debugElement.injector.get(PlayersProvider);
        playersService.getFilteredPlayers('nfl', '').subscribe( (players) => {
			component.players = players;
		});
        
        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item ion-label h2'));
        element = debug.nativeElement;
		//assert data is on the page
		expect(element.textContent).toContain('Pittsburgh'); 
		
		var debugList = fixture.debugElement.queryAll(By.css('ion-card'));
		expect(debugList.length).toBeGreaterThan(0); 
	});
	
	it('displays nba players from houston', () => {
        
        //get the data
        var playersService = fixture.debugElement.injector.get(PlayersProvider);
        playersService.getFilteredPlayers('nba', 'houston').subscribe( (players) => {
			component.players = players;
		});
        
        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
		debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item ion-label h2'));
        element = debug.nativeElement;
		//assert data is on the page
		expect(element.textContent).toContain('Houston Rockets'); 
    });

    //switching leagues
    it('view players from different leagues', () => {
        
        //clicking the nba button will trigger call to obtain news 
        var playersService = fixture.debugElement.injector.get(PlayersProvider);
        //inject observable since actual provider is not called
        spyOn(playersService, 'getFilteredPlayers').and.returnValue(Observable.of(true));
        
        //list of debug elements
        debugList = fixture.debugElement.queryAll(By.css('button'));
        //find the debug element
        for (var i=0; i < debugList.length; i++) {
            if (debugList[i].nativeElement.innerText.indexOf('NBA') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('MLB') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('NFL') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
        }
        //news feed should be invoked when clicking the NBA button
        expect(playersService.getFilteredPlayers).toHaveBeenCalledWith('nba', '');
        //news feed should have been called twice (second time with 'mlb')
        expect(playersService.getFilteredPlayers).toHaveBeenCalledTimes(3);
    });

    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
        debug = null;
        element = null;
    });
 
 
});