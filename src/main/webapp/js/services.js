

angular.module('MyApp').factory('personasDAO', [ '$http', function($http) {
	var baseUrl= '/backEndChat';
	return{
	query: function() { 
		return $http.get(baseUrl); 
		},
	get: function(id) { 
		return $http.get(baseUrl+ '/' + id); },
	add: function(item) { 
		return $http.post(baseUrl+ '/', item); },
	change: function( item) {
		return $http.put(baseUrl+ '/' , item);
	},
	remove: function(id) {
		return $http.delete(baseUrl+ '/' + id);
	}
	};
} ]);