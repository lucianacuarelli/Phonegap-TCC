////////////////////////////////////////////////////////////////////////////////
// Copyright (c)
// All Rights Reserved.
// Todos os direitos reservados.
// 
// @author      Luciana Cuarelli, Tassia Cristina
// @version     Mobile 2013
//
////////////////////////////////////////////////////////////////////////////////    
UseClass = { 
		//----------------------------------
		//  useClass
		//----------------------------------	
		/**
		 * Construtor da classe
		 */
		useClass:function(){
			//------------------------------------------------------------------
			//
			//  private
			//
			//------------------------------------------------------------------	
			//----------------------------------
			//  _attribute
			//----------------------------------	
			/**
			 * Metodos e atributos privados
			 */
			var _attribute = 100,
				_color = "#000000",
				_name = "UseClass"
			
			//----------------------------------
			//  _defaults
			//----------------------------------	
			/**
			 * Atributos privados defaults
			 */
			_defaults = {
                animatePadding: 60,
                defaultPadding: 10,
                evenColor: '#ccc',
                color: '#eee',
            },			
			
			//----------------------------------
			//  method
			//----------------------------------
			/**
			 *  Metodo que pode ser executado externamente. 
			 *  Se passar parametro o metodo configura o atributo privado,
			 *  caso contrário tenta retornar a configuração já existente no mesmo.
			 *  @param value Paramêtro do método
			 *  @return UseClass
			 */		
			_method = function(value)
			{
				if(value) _attribute = value;
				value = null;
				return _attribute;		
			};			
			
			//------------------------------------------------------------------
			//
			//  public
			//
			//------------------------------------------------------------------
			//----------------------------------
			//  attribute
			//----------------------------------	
			/**
			 * Metodos e atributos privados
			 */
			this.attribute = 500;
			this.nameX = 'LU';
				
			//----------------------------------
			//  init
			//----------------------------------
			/**
			 *  Metodo inicializador executado quando a classe é criada. 
			 *  @param value Parametro do metodo
			 *  @return UseClass
			 */		
			this.init = function(){
				
				///alert('UseCLASS');
				
				//var useService = UseJS.start('UseService');
				//var useService = UseLoad('UseService');
				
				//alert('colorCLASS:'+this.color());
				//alert('colorSERVICE:'+UseService.test('SERVICE STATIC'));
				
				//Configura o atributo privado quando a classe é criada
				this.attribute = {attributeA:'valueA', attributeB:_attribute, name:_name};
				
				Use.extend(_defaults, this.attribute);
				
				this.defaults = _defaults;
			};			

			//----------------------------------
			//  metho---------------------------------
			/**
			 *  Metodo que pode ser executado externamente. 
			 *  Se passar parametro o metodo configura o atributo privado,
			 *  caso contrário tenta retornar a configuração já existente no mesmo.
			 *  @param value Paramêtro do método
			 *  @return UseClass
			 */		
			this.method = function(value)
			{
				if(value)
					this.attribute = value;
				else{
					value = null;
					return this.attribute;
				}		
				value = null;	
				return this;
			};
			
			//----------------------------------
			//  color
			//----------------------------------
			/**
			 *  Metodo que pode ser executado externamente. 
			 *  Se passar parametro o metodo configura o atributo privado,
			 *  caso contrário tenta retornar a configuração já existente no mesmo.
			 *  @param value Paramêtro do método
			 *  @return UseClass
			 */		
			this.color = function(value)
			{
				if(value) 
					_defaults.color = value; 
				else{
					value = null; 
					return _defaults.color;
				}
					
				value = null;	
				return this;				
			};
			
		    return this;
		},
		//------------------------------------------------------------------
		//
		//  Constants
		//
		//------------------------------------------------------------------
		TEST:'test',
		
		//------------------------------------------------------------------
		//
		//  Methods static
		//
		//------------------------------------------------------------------
		test : function(value) {
			//Static || instanciado
			//return UseClass.start().test(object);
			
			alert(value);
		},
		start:function()
		{
			//Cria instância da UseClass
			if (!UseClass.instance){
	        	UseClass.instance = new this.useClass();
	        	UseClass.instance.init();
	        }
	    	return UseClass.instance;
		},
		create:function()
		{
			//Cria instância da UseClass
        	UseClass.instance = new this.useClass();
	    	UseClass.instance.init();
	    	return UseClass.instance;
		}
	};
	
	//----------------------------------
	//  Plugins
	//----------------------------------
	/**
	 *  Extendedo jQuery como plugin de classe. 
	 */		
	(function(Use){
		var actions = {
		    newElement : function(type) {
		    	
				//Remove area de novo item 
		    	Use('.use-newitem').remove();
		    	
		    	//Prepara html que deve ser adicionado
				var html = '<li data-side="r" class="use-newitem use-timeline-unit use-timeline-two-column use-clearfix">'+
	'<div class="use-header-border use-top-border-right"></div>'+
	'<div class="use-timeline-container use-timeline-unit-container-right">'+
		'<div id="newContent" style="text-align: center;">'+
			'<img src="http://media2.juggledesign.com/qtip2/images//loading.gif" alt="Profissional" width="31" height="31">'+
		'</div>'+
	'</div>'+
	'<a href="#" class="use-link-subtle" title="Teste de tipo"><i class="use-spine-pointer-'+type+'"></i></a>'+
	'<div class="use-timeline-footer use-bottom-border-right"></div>'+
'</li>';				
				
				//Adiciona novo nó
				$(html).insertAfter('#use-timeline-menu');		       		
		    	
		    	Use('#use-content-area .use-timeline-unit:gt(1)').each(function(){
		    		if( Use(this).attr('data-side') == 'l'){
		    			Use(this).attr({ 'data-side': 'r' });
		    			
		    			Use(".use-header-border", this)
    					 		 .removeClass("use-top-border-left")
    							 .addClass("use-top-border-right");
    							 
    					Use(".use-timeline-container", this)
    					 		 .removeClass("use-timeline-unit-container-left")
    					 		 .addClass("use-timeline-unit-container-right");
    					 		 
    					 Use(".use-timeline-footer", this)
    					 	.removeClass("use-bottom-border-left")
    					 	.addClass("use-bottom-border-right");
    				}	 	
		    		else{
		    			Use(this).attr({ 'data-side': 'l' });
		    			
		    			Use(".use-header-border", this)
	    					 .removeClass("use-top-border-right")
	    					 .addClass("use-top-border-left");
	    					 
	    					 Use(".use-timeline-container", this)
	    					 .removeClass("use-timeline-unit-container-right")
	    					 .addClass("use-timeline-unit-container-left");
	    					 
	    					 Use(".use-timeline-footer", this)
	    					 .removeClass("use-bottom-border-right")
	    					 .addClass("use-bottom-border-left");	
		    		}
		    	});
		    	
		    	//Use(this).css({'background-color': '#ffe', 'border': '1px solid #FF0000'});
		    	Use('.use-newitem').css({'background-color': '#ffe', 'border': '1px solid #FF00FF'});
		    	
				Use.ajax({
				  url: "http://localhost/usestart/news/view?format=html",
				  dataType : "html",
				  success: function(data){
				    Use('#newContent').empty().append(data);
				  },
				  error: function(data){
				  	alert('error');
				    //$('#newContent').empty().append(data);
				  },
				  cache : false
				});		        
		    },
		    addComment : function() {
				actions.newElement('comment');
		    },
		    addVideo : function() {
				actions.newElement('video');
		    },
		    addPhoto : function() {
				actions.newElement('image');
		    },
		    addTask : function() { 
				actions.newElement('task');
		    },
		    addPresentation : function(){ 
				actions.newElement('presentation');
		    },
		    addLink : function(){ 
				actions.newElement('link');
		    },
		    addMessage : function(){ 
				actions.newElement('message');
		    },
		    addArticles : function(){ 
				actions.newElement('article');
		    },
		    addEvents : function(){ 
		    	actions.newElement('event');
		    },
		    addAction : function(){
		    	actions.newElement('actions');
		    },
		    addHelp : function(){
		    	actions.newElement('what'); 
		    },
		    addQuiz : function(){
		    	actions.newElement('quiz'); 
		    }
		  }		
		
		Use.fn.addLink = function(){
			this.each(function(){
				Use(this).bind("click", function(event){ 
  					actions[(Use(this).attr("id"))]();
  					event.preventDefault(); 
				});
			});	
		}
		
		Use.fn.maxHeight = function(){
			var max = 0;
			this.each(function(){
				max = Math.max( max, $(this).height() );
			});
			return max;
		}
		
		Use.fn.lockDimensions = function( type ){
			return this.each(function(){
				var $this = $(this);
				
				if(!type || type == 'width'){
					$this.width( $this.width());
				}
				
				if(!type || type == 'height'){
					$this.height( $this.height());
				}
			});	
		};
		
		$.fn.tooltip = function( options ) {  
		
		    // Create some defaults, extending them with any options that were provided
		    var settings = $.extend( {
		      'location'         : 'top',
		      'background-color' : 'blue'
		    }, options);
		
	      UseDebug.p(settings);
		    return this.each(function() {        
		    });
		  };		
		
	})( NossoTablet, window, document );