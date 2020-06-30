

angular.module('MyApp').factory('botChat', [ '$http', function($http) {
	var baseUrl= 'https://www.botlibre.com/rest/api/chat';
	var baseUrlLogin= 'https://www.botlibre.com/rest/api/check-user';
	var baseUrlInstances = 'https://www.botlibre.com/rest/api/form-get-all-instances';
	return{
	queryInstances: function(params) { 
		
		
		
		var req = {
				 method: 'GET',
				 url : baseUrlInstances,
				 params:params
		}
		
		return $http(req); 
		},
	get: function(id) { 
		return $http.get(baseUrl+ '/' + id); },
	post: function(item) {
		
		var req = {
				 method: 'POST',
				 url : baseUrl,
				 headers: {
				   Accept: "*/*",
				   'Content-Type': 'application/xml'
				 },
				 data:item
				
		}
		
		return $http(req); },
	login: function(item) {
			
			var req = {
					 method: 'POST',
					 url : baseUrlLogin,
					 headers: {
					   Accept: "*/*",
					   'Content-Type': 'application/xml'
					 },
					 data:item
					
			}
			
			return $http(req); },
	change: function( item) {
		
		return $http.put(baseUrl+ '/' , item);
	},
	remove: function(id) {
		return $http.delete(baseUrl+ '/' + id);
	}
	};
	

	
} ]);