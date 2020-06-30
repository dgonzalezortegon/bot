

angular.module('MyApp').controller('PersonasControlador',['$log','$window','personasDAO','botChat',function($log,$window,personasDAO,botChat) {
	var vm = this;
	var x2js = new X2JS();
	
	const str_vasos = "1, 2, 3 ó 4";
	vm.modo = 'add';
	vm.listado = [];
	vm.listInstances = [];
	vm.elemento = {};
	vm.access= access;
	vm.acceso = {};
	vm.user = null;
	vm.token = null;
	vm.conversation = "";
	vm.selectInstance = selectInstance;
	vm.correction = false;
	vm.vasos = false;
	
	//Instance Create to Test
	vm.instance = null;
	
	//applicationId
	vm.applicationId = null;
	
	
	
	
	this.$onInit = function(){
		//vm.list();
		vm.listado = [];
		vm.listInstances = [];
	}
	
	
	function checkInstances(id){
		
		
		var params = {application : id,
			    filterPrivate :true,
			    token : vm.token,
			    user : vm.acceso.login
		}
		
		
		botChat.queryInstances(params).then(exito,error);
		
		function exito(data){
			
			var response = x2js.xml_str2json(data.data);
			
			console.log(response);
			
			if(response.instanceConfigs.instance.length){
				response.instanceConfigs.instance.forEach(function(instance){
				
					console.log(instance);
					vm.listInstances.push({id:instance._id,name:instance._name});
				});
			}else{
				vm.listInstances.push({id:response.instanceConfigs.instance._id,name:response.instanceConfigs.instance._name});
			}
			
		}
		function error(){
			
		}
		
	}
	
	function selectInstance(){
		
		vm.elemento = {};
		vm.conversation = "";
		
		//Primer Mensaje de Bienvenida
		vm.send();
	}
	

	function access(){
		
		//Example
		//var xml = "<user  user='dgonzalezo' password='miPassword88'></user>";
			
		var xml = {user : { _user :vm.acceso.login, _password:vm.acceso.password},};
		var request = x2js.json2xml_str(xml);
		
		console.log(request);
	
		botChat.login(request).then(
				function(resp){
					//Parser XML
					var data = x2js.xml_str2json(resp.data);
					
					console.log(data.user);
					
					vm.user = data.user._name;
					vm.login = vm.acceso.login;
					
					vm.token = data.user._token;
					vm.applicationId = data.user._applicationId;
					
					
					checkInstances(vm.applicationId);
					
				},
				function(resp){
					$log.error(resp.statusText)
					
				}
				
		);
	}
	
	
	
	vm.list = function(){
		
		console.log('list');
		
		personasDAO.query().then(
				function(resp){
					vm.listado = resp.data;
					vm.modo = 'list';
				},
				function(resp){
					$log.error(resp.statusText)
					
				}
				
		);
		
		
	}
	
	vm.cancel = function(){
		vm.elemento = {};
		vm.list();
		
	}
	
	vm.send1 = function(){
		vm.elemento.mesg ="1";
		vm.vasos = false;
		vm.send();
	}
	
	vm.sendMas1 = function(){
		
		vm.elemento.mesg ="+1";
		vm.vasos = false;
		vm.send();
	}
	
	vm.send = function(){
		
		console.log('send chat: ' +vm.elemento.mesg);
		
			var message = vm.elemento.mesg;
			var conversation = vm.conversation;
			
			//Format usado en el primer mensaje de Saludo, sin message
			var xml = {chat : { _application :vm.applicationId, _token:vm.token,  _user :vm.acceso.login, _password:vm.acceso.password, _instance:vm.instance.id }};
			
			if(vm.conversation != ""){
				xml = {chat : { _application :vm.applicationId, _token:vm.token,  _user :vm.acceso.login, _password:vm.acceso.password, _instance:vm.instance.id, _conversation:vm.conversation, message }};
			}
			
			if(vm.correction){
				xml = {chat : { _application :vm.applicationId, _token:vm.token,  _user :vm.acceso.login, _password:vm.acceso.password, _instance:vm.instance.id, _conversation:vm.conversation, _correction:true,  message }};
			}
			
			var request = x2js.json2xml_str(xml);
			
			console.log(request);
			
			//backend
			vm.sendRequest(vm.elemento).then(exito,error);
			
			function exito(resp){
				
				console.log(resp);
				//push message in the View
				vm.listado.push(resp.data);
				
				//scroll down
				document.getElementById('bottom').scrollIntoView();
				vm.elemento = {};
				
				
				botChat.post(request).then(
						function(resp){
							//Parser XML
							var data = x2js.xml_str2json(resp.data);
							vm.elemento.mesg = data.response.message;// + ' [' + vm.user + ']';
							
							//if Primera Respuesta Save Conversation
							
							if (vm.conversation == ''){
								vm.conversation = data.response._conversation;
							}
							
							//1, 2, 3 ó 4
							checkVasos(data.response.message);
							
							//backend
							vm.backend(vm.elemento);
						},
						function(resp){
							$log.error(resp.statusText)
							
						}
						
				);
			}
			function error(){
				
			}
	}
	
	/**
	 * Backend and show into the View
	 */
	vm.backend = function(elem){
			console.log('backend to Server');
			
			elem.usuario = vm.acceso.login;
			
			personasDAO.add(elem).then(
					function(resp){
						console.log(resp);
						vm.listado.push(resp.data);
						document.getElementById('bottom').scrollIntoView();
						vm.elemento = {};
						return true;
					},
					function(resp){
						$log.error(resp.statusText)
						
					}
					
			);
		
		
	}
	
	/**
	 * Backend
	 */
	vm.sendRequest = function(elem){
		console.log('send sendRequest')
		
		elem.usuario = vm.acceso.login;
		return personasDAO.add(elem);
	
	}
	
	function checkVasos(response){
		
		var res = response.match(/.*1.*2.*3.*4/g);
		if(res != null){
			vm.vasos = true;
		}
		
	}
	
	

	this.$onDestroy = function(){
	}
	
}]);
	



