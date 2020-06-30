angular.module('MyApp', [  'ngRoute' ]);


angular.module('MyApp').controller('AppControlador', [ function() {
	var vm = this;
	
	vm.user = "";

	vm.menu = [ {
		texto : 'Login',
		titulo : 'Login',
		
		plantilla : 'views/chat.html'
	},{
		texto : 'Chat',
		titulo : 'Chat',
		plantilla : 'views/chat.html'
	}];
	
	
	
	vm.titulo = vm.menu[0].titulo;
	vm.plantilla = vm.menu[0].plantilla;
	vm.cambia = function(index) {
		
		vm.titulo = vm.menu[index].titulo;
		vm.plantilla = vm.menu[index].plantilla;
	}
	
} ]);
