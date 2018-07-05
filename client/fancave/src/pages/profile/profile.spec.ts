import { ProfilePage } from './profile';
import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { NavParams } from 'ionic-angular';

let component: ProfilePage;
let fixture: ComponentFixture<ProfilePage>;
let debug: DebugElement;
let element: HTMLElement;

describe('Page: Profile Page', () => {

	//create test environment
	beforeEach(async(() => { //async reads external files async

		TestBed.configureTestingModule({

			declarations: [FanCaveApp, ProfilePage], //component to test

			providers: [
				NavController,
				{
					provide: NavParams,
					useValue: {
						'data': 'ozair'
						}
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

		fixture = TestBed.createComponent(ProfilePage); //component
		component = fixture.componentInstance; //instance

	});

	it('profile page should be created', () => {
		expect(component instanceof ProfilePage).toBe(true);
	});

	//test case
	it('profile page contains a non-empty user', () => {
		console.log("user %s", component.getUser());
		expect(component.getUser().length).toBeGreaterThan(0);
	});


	//destroy the component instance
	afterEach(() => {
		fixture.destroy();
		component = null;
		debug = null;
		element = null;
	});


});