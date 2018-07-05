import { TabsPage } from './tabs';
import { StatusBarMock, SplashScreenMock } from '../../../test-config/mocks';
import { IonicModule, NavController } from 'ionic-angular';

import { async, TestBed } from '@angular/core/testing';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FanCaveApp } from '../../app/app.component';
import { PlatformMock } from '../../../test-config/mocks';

describe('Tabs Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FanCaveApp, TabsPage],
      imports: [
        IonicModule.forRoot(FanCaveApp)
      ],
      //mock classes to simulate classes (provide) using the class (useClass). 
      //mock classes are defined in tsconfig/mocks-ionic.ts
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        NavController,
      ]
    })
  }));

  //invoked once before 
  beforeEach(() => {
    fixture = TestBed.createComponent(FanCaveApp);
    component = fixture.componentInstance;

  });

  it('displays the Tabspage page to the user', () => {
    expect(component['rootPage']).toBe(TabsPage);
  });


});
