var google = {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
			return {
				addListener: function () { }
			}
        },
        InfoWindow : function () {
        },
        LatLng: function(lat, lng){
        	return [lat, lng];
        },
        Map: function(obj){

		},
		event: {
			addListenerOnce: function (any, any, callback) { }
		},
		Animation: { BOUNCE: 1, DROP: 2  },
        MapTypeId: {ROADMAP: true},
        places: {
        	AutocompleteService: function(){

        	},
    		PlacesService: function(obj){
    			return {
    				PlacesServiceStatus: {
	        			OK: true
	        		},
	        		textSearch: function(query){
	        			return [];
	        		},
	        		nearbySearch: function(query){
	        			return [];
	        		}
    			};	
    		}
        }
    }
};