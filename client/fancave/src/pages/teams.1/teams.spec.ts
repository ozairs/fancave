import { ViewControllerMock } from '../../../test-config/mocks';
import { ScoresPage } from './../scores/scores';
import { TeamsPage } from './teams';
import { NavParamsMock, ModalControllerMock } from '../../../test-config/mocks';
import { IonicModule, NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeamsProviderMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { Observable } from 'rxjs/Observable';
import { TeamsProvider } from '../../providers/teams/teams';

let component: TeamsPage;
let fixture: ComponentFixture<TeamsPage>;
let debug: DebugElement;
let debugList: DebugElement[];
let element: HTMLElement;

describe('Page: Teams Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, TeamsPage, ScoresPage], //component to test
 
            providers: [
                NavController,
                {
                    provide: TeamsProvider,
                    useClass: TeamsProviderMock
                },
                {
                    provide: ModalController,
                    useClass: ModalControllerMock
                },
                {
                    provide: ViewController,
                    useClass: ViewControllerMock
                },
                {
                    provide: NavParams,
                    useClass: NavParamsMock
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
 
        fixture = TestBed.createComponent(TeamsPage); //component
        component = fixture.componentInstance; //instance

    });
  
    //invoke the test case (call provider and display data inside view)
    it('displays nhl team with name Maple Leafs', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("nhl").subscribe( (teams) => {
			component.teams = teams;
		});

        //trigger data binding - causes 'subscribe' undefined error
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
        element = debug.nativeElement;
 
        //assert data is on the page
        expect(element.textContent).toContain('Maple Leafs'); 
    });

    it('displays nba team with name Raptors', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("nba").subscribe( (teams) => {
            component.teams = teams;
            //trigger data binding - causes 'subscribe' undefined error
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Raptors'); 
		});

    });

    it('displays mlb score with name Jays', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("mlb").subscribe( (teams) => {
			component.teams = teams;
            //trigger data binding - causes 'subscribe' undefined error
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Jays'); 
        });
    });

    it('displays nfl teams with name Buffalo', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("nfl").subscribe( (teams) => {
			component.teams = teams;
            //trigger data binding - causes 'subscribe' undefined error
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Buffalo'); 
        });
    });

    //switching leagues
    it('view teams from different leagues', () => {
        
        //clicking the nba button will trigger call to obtain news 
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        //inject observable since actual provider is not called
        spyOn(teamsService, 'getTeams').and.returnValue(Observable.of(true));
        
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

        //news feed should have been called twice (second time with 'mlb')
        expect(teamsService.getTeams).toHaveBeenCalledTimes(3);
    });

    //open scores modal
    it('view scores modal for the team name with Maple Leafs', () => {
    
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("nhl").subscribe( (teams) => {
            component.teams = teams;
        
            var scoresModal = fixture.debugElement.injector.get(ModalController);
            spyOn(scoresModal, "create").and.callThrough();

            fixture.detectChanges();
            //list of debug elements
            debugList = fixture.debugElement.queryAll(By.css('ion-card ion-card-content ion-list ion-item button'));
            //find the scores button
            for (var i=0; i < debugList.length; i++) {
                if (debugList[i].nativeElement.innerText.indexOf('Scores') >= 0) {
                    // element = debugList[i].nativeElement;
                    // var button:DebugElement = debugList[i].queryAll(By.css('button'))[1];
                    debugList[i].triggerEventHandler('click', null);
                }
            }
            fixture.detectChanges();
            
            expect(scoresModal.create).toHaveBeenCalled();
        });
    });

    it ("display map view for nba teams", () => {

        //obtain list of nba teams
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getTeams("nba").subscribe( (teams) => {
            component.teams = teams;
            
            //click the map button => triggers google maps with pins from nba teams
            let mapBtn = fixture.debugElement.query(By.css('ion-footer ion-toolbar ion-grid ion-row button[name=map]'));
            mapBtn.triggerEventHandler('click', null);

            fixture.detectChanges();
            
            //check if pins are populated after page loads
            expect(component.markers.length).toBeGreaterThan(0);
        });
        
        
    });

    it ("switch map view to mlb teams", () => {

        //click the map button => triggers google maps with pins from nhl (default)
        let mapBtn = fixture.debugElement.query(By.css('ion-footer ion-toolbar ion-grid ion-row button[name=map]'));
        mapBtn.triggerEventHandler('click', null);

        //list of debug elements
        debugList = fixture.debugElement.queryAll(By.css('button'));
        //find the debug element
        for (var i=0; i < debugList.length; i++) {
            if (debugList[i].nativeElement.innerText.indexOf('MLB') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
        }
        
        fixture.detectChanges();
                
        //check if pins are populated after page loads
        expect(component.markers.length).toBeGreaterThan(0);
    });

    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
        debug = null;
        element = null;
    });
 
 
});