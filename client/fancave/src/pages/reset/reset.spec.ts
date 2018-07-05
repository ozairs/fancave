import { ResetPage } from './reset';
import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock, AuthServiceProviderMock } from '../../../test-config/mocks';
import { NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

let component: ResetPage;
let fixture: ComponentFixture<ResetPage>;
let debug: DebugElement;
let element: HTMLElement;

describe('Page: Reset Page', () => {

	//create test environment
	beforeEach(async(() => { //async reads external files async

		TestBed.configureTestingModule({

			declarations: [FanCaveApp, ResetPage], //component to test

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
				},
				{
                    provide: AuthServiceProvider,
                    useClass: AuthServiceProviderMock
                },
			],

			imports: [
				IonicModule.forRoot(FanCaveApp)
			]

		}).compileComponents();

	}));

	//create the component instance
	beforeEach(() => {

		fixture = TestBed.createComponent(ResetPage); //component
		component = fixture.componentInstance; //instance

	});

	it('reset page should be created', () => {
		expect(component instanceof ResetPage).toBe(true);
	});

	//destroy the component instance
	afterEach(() => {
		fixture.destroy();
		component = null;
		debug = null;
		element = null;
	});


});