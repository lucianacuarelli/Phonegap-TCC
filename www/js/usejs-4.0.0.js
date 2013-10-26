////////////////////////////////////////////////////////////////////////////////
// Copyright (c)
// All Rights Reserved.
// Todos os direitos reservados.
// 
// @author      Luciana Cuarelli, Tassia Cristina
// @version     Mobile 2013
//
////////////////////////////////////////////////////////////////////////////////  
(function( window, undefined ) {
	// Expose jQuery to the global object
	window.Use = window.USE = window.NossoTablet = jQuery;
	
	UseLoad = function(className){
		    var instanceMethod = "start",
		    jsPattern = "usejs/javaScriptName.js",
		    regExp = new RegExp("(.*)(javaScriptName)(.*)", "gi"),
		    before = "$1",
		    after = "$3";
		    
			//----------------------------------
			//  loadClass
			//----------------------------------
			/**
			 *  Carraga classe javaScript dinâmicamente.
			 */
			var loadClass = function (className) {
		        Use.ajax({
		            type : "GET",
		            url : jsPattern.replace(regExp, className),
		            dataType : "script",
		            async : false,
		            cache : true
		        });
			},
			
			//----------------------------------
			//  load
			//----------------------------------
			/**
			 *  Carraga classe javaScript dinâmicamente.
			 */			
			load = function (className){
				if (eval("typeof "+ className) != "function"){
			    	loadClass(before + className + after);
				}
				return eval(className +"."+ instanceMethod +"()");
			},
			
			create = function (className) {
				if (eval("typeof "+ className) != "function"){
					loadClass(before + className + after);
				}
				return eval("new "+ className +"()");
			};
			
			return load(className);
	};
	
	//----------------------------------
	//  UseJS
	//----------------------------------	
	/**
	 * UseJS extend o framework jQuery, implementando recursos adicionais que 
	 * para trabalhar com javascript struturado em orientação a objetos 
	 */
	UseJS ={ 
		version:'4.0.0.1',
		
		useJS:function() {
		    return {
				instanceOf : function(object, constructor) {
				  if (object === constructor.instance){
						return true;
				    }
				    else{
					   return false;
				    }
				}
		    };
		},
		
		start:function()
		{
			//Cria instância da UseJS
			if (!UseJS.instance){
	        	UseJS.instance = new this.useJS();
	        	UseJS.instance.init();
	        }
	    	return UseJS.instance;
		},
		create:function()
		{
			//Cria instância da UseJS
        	UseJS.instance = new this.useJS();
	    	UseJS.instance.init();
	    	return UseJS.instance;
		},
		instanceOf : function(object, constructor) {
			return UseJS.start().instanceOf(object, constructor);
		}
	};	
		
	UseDebug = {
		pa : function(data){
			var debug = '';
			if(typeof(data) == 'object'){
				for (var i in data){
					debug+= i+" -> "+data[i]+"\n";
				}
			}
		},
		p:function(data)
		{
			var fnc = function(data){
				var debug = '';
				if(typeof(data) == 'object'){
					for (var i in data){
						debug+= i +"<i>(" + typeof(data)+ ")</i> \n";
					}
				}
				else{
					debug+= data + "\n";
				}
				return debug;
			};
			
			//Verifica se o parametro é um objeto
			if(typeof(data) == 'object'){			
				var metodos = '';
				var atributos = '';
				var debug = '[--print Object-------------------------------------------- Luciana Cuarelli - (luciananightwish@gmail.com) -->]<br/>';
				
				var debug = '[--print Object-------------------------------------------- Luciana Cuarelli - (luciananightwish@gmail.com) -->]<br/>';
					for (var i in data){
						if(typeof(data[i])=='function'){
							metodos+= '<b>'+i+":</b> <i>("+(typeof(data[i]))+")</i>  <br/> <b>-) </b>"+data[i]+" <b>(-</b>\n<br/>";
						} 
						else {
							atributos+= '<b>'+i+":</b> <i>("+(typeof(data[i]))+")</i>  <br/> <b>-) </b>"+String(data[i])+" <b>(-</b>\n<br/>";
						}
					}
				debug += '[----------------------------------------------------------------------------------> <b>Atributos</b> ]<br/>';
				debug += atributos;
				debug += '[----------------------------------------------------------------------------------> <b>Metodos</b> ]<br/>';
				debug += metodos;			
				debug += '[<---------------------------------------------------------------------------------]<br/>';
				
				Use("#use-debug").remove();
				Use("body").prepend('<div id="use-debug"></div>');
				Use('#use-debug').html(debug).css({ 'border': '3px', 
											'border-style': "solid", 
											'border-color':'#c8560e', 
											'background-color':'#ddf2f8', 
											'margin':'10px', 
											'padding':'10px',
											'display':'block'
										});
			}
			else{
				var debug = '[--print String--'+(++Use.psCont)+'---------------------------------------- Luciana Cuarelli - (luciananightwish@gmail.com) -->|<br/>';
					debug+= data;
					debug += '<br/>|<------------------------------------------------------------------------]<br/>';
					Use("#use-debug").remove();
					Use("body").prepend('<div id="use-debug"></div>');
					Use('#use-debug').html(debug).css({ 'border': '3px', 
												'border-style': "solid", 
												'border-color':'#7cc80e',
												'background-color':'#ddf2f8', 
												'margin':'10px', 
												'padding':'10px', 
												'display':'block'										
												});
			}
		}
	};
		
/**
	 * @class A basic rectangle class, inherits from Shape.
	 * This class could be considered a concrete implementation class
	 * 
	 * Popula combobox(select) utilizando ajax
	 * 
	 * O primeiro argumento deve ser a id do combobox inical da cadeia de
	 * seletores, seguido da url onde deve ser recuperado os dados para
	 * popular o combobox seguinte chamado de target.
	 * 
	 * O valor do combobox selecionado e enviado automaticamente como parametros 
	 * do metodo GET bem como pode ser enviado outros parametros alem atraves do
	 * metodo data(}.
	 * 
	 * Se nao deseja envir nenhum parametro extra nao e necessario utilizar o metodo
	 * data.
	 * 
	 * Pode ser enviar como data uma acao que deve ser disparada apos o retorna 
	 * do evento ajax ser executado.
	 * 
	 * EXEMPLO:
	   useComboBox('#categorySelect')
			.url('select-search.php')
			.data( { "type": "true", "estado":"SP" , meuEvento: "nomeDaFuncaoSemApas" } )
			.target('#elementSelect')
			
			
			.url('select-search.php')
			.data( { "type": "true", "cidade":"Santos" } )
			.target('#attributeSelect');
	 * 
	 * @constructor
	 * @param {id} Nome do parametro de entrada 
	 * @author Gabriel Reid
	 */	
	useComponent = function(selector) {
		return new useComponent.Use(selector);
	};	
	useComponent.prototype = {
		//Configura a url que deve ser acessada no servidor para obter dados
		baseUrl: function(){
				var baseUrl = location.href;
				var baseUri = baseUrl.match(/(https?:\/\/)([\-\w.]+)+(:\d+)?(\/([\-\w.]+)?)?/i);
            	var url = baseUri[2];
            	
            	if(url == 'localhost' || url == '127.0.0.1'){
            		baseUrl = baseUri[0]; 
            	}
            	else{
            		baseUrl = baseUri[1] + baseUri[2];
            	}			

            return baseUrl;	
		},	
	   /** 
	    * This is a private method, just used here as an example
		* @returns A Coordinate dataect representing the location of this Shape
		* @type Coordinate
		* @see #setColor 
	    */
		baseUri: function(){
			return location.href;
		},
		view: function(){
			return this.Use[0];
		},				
	   /**
		* Set the coordinates for this Shape
		* @param {Coordinate} coordinates The coordinates to set for this Shape
		*/
		mala: function(paramX){
			return paramX;
		}				
	};
	
	/**
	 * @class A classe useSlider realiza troca de imagens dinamicamente.
	 * 
	 * EXEMPLO:
	   useSlider('#slides-01');
	 * 
	 * @constructor
	 * @param {id} Nome do parametro de entrada 
	 * @author Gabriel Reid
	 */
	useSlider  = function(slides, menu) {
		return this instanceof useSlider  ? this.init(slides, menu) : new useSlider (slides, menu);
	};
	
	/**
	 * The color of this shape
	 * @type Color
	 */
	useSlider.prototype.color = null;
	
	/**
	 * The border of this shape. 
	 * @type int
	 */
	useSlider.prototype.border = null;	
	
	useSlider.prototype = {
		init: function(slides, menu){ 
			var _len = (Use(".slides").length + 1);
			
			for (var i=1; i <= _len; i++) {
			  this.addEventListner('#slides-'+i, "#menu-"+i);
			};
			
		},
		addEventListner: function(slides, menu){
			
			var _totWidth = 0;
			var _positions = new Array();
			
			Use(slides +' .slide').each(function(i){
					/* Loop through all the slidesX and store their accumulative widths in totWidth */
					_positions[i]= _totWidth;
					_totWidth += Use(this).width();
			
					/* The _positions array contains each slide's commulutative offset from the left part of the container */
			
					if(!Use(this).width())
					{
						alert("Please, fill in width & height for all your images!");
						return false;
					}
				});
			
				Use(slides).width(_totWidth);
			
				/* Change the cotnainer div's width to the exact width of all the slides combined */
			
				Use(menu + ' ul li a').click(function(e)
				{
					/* On a thumbnail click */
					Use('li.menuItem').removeClass('act').addClass('inact');
					Use(this).parent().addClass('act');
			
					var pos = Use(this).parent().prevAll('.menuItem').length;
			
					Use(slides).stop().animate({marginLeft:-_positions[pos]+'px'},150);
					/* Start the sliding animation */
			
					e.preventDefault();
					/* Prevent the default action of the link */
				});
			
				/* On page load, mark the first thumbnail as active */			
				Use(menu + ' ul li.menuItem:first').addClass('act').siblings().addClass('inact');
		}
	};
	
	/**
	 * @class A basic rectangle class, inherits from Shape.
	 * This class could be considered a concrete implementation class
	 * 
	 * Popula combobox(select) utilizando ajax
	 * 
	 * O primeiro argumento deve ser a id do combobox inical da cadeia de
	 * seletores, seguido da url onde deve ser recuperado os dados para
	 * popular o combobox seguinte chamado de target.
	 * 
	 * O valor do combobox selecionado e enviado automaticamente como parametros 
	 * do metodo GET bem como pode ser enviado outros parametros alem atraves do
	 * metodo data(}.
	 * 
	 * Se nao deseja envir nenhum parametro extra nao e necessario utilizar o metodo
	 * data.
	 * 
	 * Pode ser enviar como data uma acao que deve ser disparada apos o retorna 
	 * do evento ajax ser executado.
	 * 
	 * EXEMPLO:
	   useComboBox('#categorySelect')
			.url('select-search.php')
			.data( { "type": "true", "estado":"SP" , meuEvento: "nomeDaFuncaoSemApas" } )
			.target('#elementSelect')
			
			
			.url('select-search.php')
			.data( { "type": "true", "cidade":"Santos" } )
			.target('#attributeSelect');
	 * 
	 * @constructor
	 * @param {id} Nome do parametro de entrada 
	 * @author Gabriel Reid
	 */
	useComboBox  = function(id) {
		return this instanceof useComboBox  ? this.init(id) : new useComboBox (id);
	};
	
	/**
	 * The color of this shape
	 * @type Color
	 */
	useComboBox.prototype.color = null;
	
	/**
	 * The border of this shape. 
	 * @type int
	 */
	useComboBox.prototype.border = null;	
	
	useComboBox.prototype = {
		init: function(id){ 
			this._id = Use(id);
			this._data = {};
			return this;
		},

		url: function(url){ 
			this._url = this.baseUrl() + url;
			return this;
		},
		data: function(data){ 
			this._data = data;
			return this;
		},
		target: function(id){ 
			this._target = Use(id);

	       this._id.selectChain({
	            target: this._target,
	            url: this._url ,
	            data: this._data
	        }).trigger('change');

			this._id = this._target;
			return this;
		},
		/**
		 * Recebe uma url onde deve buscar dados para popular o combobox com a opçao de
		 * elementos desativados, permitindo que seja selecionado somente itens que tenham 
		 * elementos contidos na base de dados.
		 * 
		 * Exemplo:
		 * useComboBox("#estado").createOptionsItemsDisable("/busca/simples/populateestado");
		 * useComboBox("#estado").createOptions("/busca/simples/populateestado");
		 * 
		 * @param {Object} url
		 */
		createOptionsItemsDisable : function(url, info, useData){
			/**
			 * id teste AA   
			 */
			var id = this._id;
			/**
			 * info teste BB   
			 */
			var info = info || 'selecione...';
			var useData = useData || false;
			Use.ajax({ 
				  type: "GET", 
				  url: this.baseUrl()+url, 
				  success: function(res){ 			
		
					var option = '<option value="">'+info+'</option>';
					var obj = eval("(" + res + ")");
			
					for (var i in obj){
						
						///useData ? value = obj[i].data : value = i;  // NOTFINAL
						value = i;
						if(obj[i] == 1){
							option +=  '<option value="' + value + '">' + i + '</option>';
						}
						else{
							option +=  '<option value="' + value + '" disabled="true">' + i + '</option>';
						}
					}
					id.html(option);
				}
			}); 			
		},
		createOptions : function(url, info){
			
			var id = this._id;
			
			var info = info || 'selecione...';
			
			Use.ajax({ 
				  type: "GET", 
				  url: this.baseUrl()+url, 
				  success: function(res){ 			
		
					var option = '<option value="">'+info+'</option>';
					var obj = eval("(" + res + ")");
			
					for (var i in obj){
						option +=  '<option value="' + i + '">' + i + '</option>';
					}
					id.html(option);
				}
			}); 			
			
		}				
	};
	//Use.extend(useComboBox.prototype, useComponent.prototype , {});			
	
})(window);
