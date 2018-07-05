// import { NewsProvider } from './news';
// import { TestBed, inject, async } from '@angular/core/testing';
// import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';

// let newsService;

// describe('Provider: News', () => {

// 	beforeEach(async(() => {

// 		TestBed.configureTestingModule({

// 			declarations: [

// 			],

// 			providers: [
// 				NewsProvider,
// 				MockBackend,
// 				BaseRequestOptions,
// 				{
// 					provide: Http,
// 					useFactory: (mockBackend, options) => {
// 						return new Http(mockBackend, options);
// 					},
// 					deps: [MockBackend, BaseRequestOptions]
// 				}
// 			],

// 			imports: [
// 				HttpModule
// 			]

// 		}).compileComponents();
// 	}));

// 	xit('should have an array with a single nhl article', inject([NewsProvider, MockBackend], (newsService, mockBackend) => {

// 		const mockResponse = {
// 			nhl: [
// 				{
// 					"url": "https://sports.yahoo.com/nhl-stars-stand-vegas-golden-knights-debut-015157678.html?src=rss",
// 					"title": "NHL stands with Vegas for Knights' debut",
// 					"urlToImage": "https://s.yimg.com/uu/api/res/1.2/4QgZSXzJmTO4rHFrfOIYLg--~B/aD01NTg7dz05OTI7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/f11dc080149d3f53c9a5e4f1145750c9",
// 					"description": "The Dallas Stars joined the Vegas Golden Knights as the NHL honored the victims of Sunday's tragic events in Las Vegas.",
// 					"publishedAt": "2017-10-07T04:09:14.325Z"
// 				}
// 			]
// 		};

// 		//mocks the HTTP calls within the News provider with a static response
// 		mockBackend.connections.subscribe((connection) => {
// 			connection.mockRespond(new Response(new ResponseOptions({
// 				body: JSON.stringify(mockResponse)
// 			})));
// 		});

// 		//trigger the mock HTTP call 
// 		newsService.getNews('nhl', false).subscribe((articles) => {
// 			//check that the articles are populated with data
// 			expect(articles['nhl'][0].title.indexOf('Vegas') >= 0);
// 			expect(articles['nhl'].length).toBeGreaterThanOrEqual(1);
// 		});
// 	}));

// 	xit('should have an array with multiple nba articles', inject([NewsProvider, MockBackend], (newsService, mockBackend) => {

// 		const mockResponse = {
// 			nba: [
// 				{
// 					"url": "https://sports.yahoo.com/carmelo-anthony-energized-thunder-melo-fun-185933441.html?src=rss",
// 					"title": "Escape from New York: 'Melo having fun again",
// 					"urlToImage": "https://s.yimg.com/uu/api/res/1.2/2CzgZAxAKVYi9JM23B_AIA--~B/aD01NTg7dz05OTI7c209MTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-images/GLB/2017-10-06/05d7dd20-aacd-11e7-9ea6-a1827a4a13ed_carmelo_1006.jpg",
// 					"description": "Carmelo Anthony doesn't have any regrets about not leaving the Knicks three years ago, but he's glad he's now playing for Oklahoma City, a contender in the West.",
// 					"publishedAt": "2017-10-07T01:18:05.429Z"
// 				},
// 				{
// 					"url": "https://www.cbssports.com/college-basketball/news/the-nations-leading-returning-scorer-may-be-small-but-has-big-dream-of-nba-draft/?src=rss",
// 					"title": "The nation's leading returning scorer may be small, but has big dream of NBA Draft",
// 					"urlToImage": "https://s.yimg.com/uu/api/res/1.2/DoAppcguQOLMaQ2XLyckvQ--~B/aD00MzM7dz03NzA7c209MTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/uu/api/res/1.2/SjN1yNhJHOLDBugHgkQIvw--/dz03NzA7aD00MzM7dGFnPW9yaWdpbmFsO2FwcGlkPXluZXdz/http://streambe.zenfs.com/streambe/streambe_5384062f-e5d7-3c19-a797-2299d68d8595-1811300153.jpeg",
// 					"description": "The odds-on favorite to lead college basketball in scoring this season plays basketball in the state of North Carolina, but he most certainly does not play for the bluebloods. He is on the radar of NBA scouts – in fact, he had workouts with the Boston Celtics and Denver Nuggets this offseason when he",
// 					"publishedAt": "2017-10-07T01:18:05.432Z"
// 				}
// 			]
// 		};

// 		//mocks the HTTP calls within the News provider with a static response
// 		mockBackend.connections.subscribe((connection) => {
// 			connection.mockRespond(new Response(new ResponseOptions({
// 				body: JSON.stringify(mockResponse)
// 			})));
// 		});

// 		//trigger the mock HTTP call 
// 		newsService.getNews('nba', false).subscribe((articles) => {
// 			//check that the articles are populated with data
// 			expect(articles['nba'][0].title.indexOf('Knicks') >= 0);
// 			expect(articles['nba'].length).toBeGreaterThanOrEqual(2);
// 		});

// 	}));

// 	xit('should have an empty array of mlb articles', inject([NewsProvider, MockBackend], (newsService, mockBackend) => {

// 		const mockResponse = {
// 			mlb: [

// 			]
// 		};

// 		//mocks the HTTP calls within the News provider with a static response
// 		mockBackend.connections.subscribe((connection) => {
// 			connection.mockRespond(new Response(new ResponseOptions({
// 				body: JSON.stringify(mockResponse)
// 			})));
// 		});

// 		//trigger the mock HTTP call 
// 		newsService.getNews('mlb', false).subscribe((articles) => {
// 			//check that no articles are populated with data
// 			expect(articles['mlb'].length).toBeLessThanOrEqual(0);
// 		});

// 	}));

// });