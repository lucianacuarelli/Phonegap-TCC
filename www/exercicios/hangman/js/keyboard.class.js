function Keyboard(opts){
	var app = this;
	
	this._kb_callback = opts.callback;
	this._kb_element = opts.keyboard_container;
	this._keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
	
	
	$('button', this._kb_element).live('click', function(e){
		app._kb_callback( $(e.target).html() );
		$(e.target).attr('disabled','true');
	});
	
	Keyboard.prototype.draw = function(){
		
		// Opening paragraph tag
		output_html = '<p>';
					
		for(key in this._keys){
			// for every key we'll just create a button!
			output_html += '<button>'+this._keys[key]+'</button>';
			
			// We do want some fancyness! So we'll create some QWERTY-keyboardness
			// Since breakrules are evil, we'll just end and re-open a paragraph on the P and L
			
			if(this._keys[key] == "P" || this._keys[key] == "L"){
				output_html += '</p><p>';
			}
			
		}
		
		// Ending paragraph tag
		output_html += '</p>';
					
		// Dump it all on screen
		this._kb_element.append(output_html)
	}
	

}