function Woord(){
	app = this;
	this._woorden 	= ['BANANA','JAVASCRIPT','LIMONADA','SORVETE','CHUVEIRO'];
	this._image 	= ['../../imagens/icons/cubechicken.png','../../imagens/icons/cubemouse.png','../../imagens/icons/cubechicken.png','../../imagens/icons/cubemouse.png','../../imagens/icons/cubechicken.png'];
	this._mask = [];
	this._maski = [];
	this._position;
	
	// Kies een random woord
	this.kiesWoord = function(){
		this._position = Math.floor(Math.random() * this._woorden.length);
		// Pak een random woord uit de array, hak deze op per letter
		this._woord	= this._woorden[this._position].split('');
		
		//$('#word_image').attr("src", '"'+this._image[this._position]+'"');
		alert(this._image[this._position]);
		$('#word_image').attr("src", '../../imagens/icons/cubechicken.png');
		
		console.log(this._woord);
		
		// Maak een mask array aan met de lengte van het gekozen woord
		for(i in this._woord){
			this._mask[i] = null;
		}
	}
	
	//Palavras
	this.getMaskedWord = function(){
		output_html = '';
		for( letter in app._mask){
			if(app._mask[letter] == null){
				output_html += ' _ ';
			}
			else{
				output_html += app._mask[letter];
			}
		}
		return output_html;
	}
	
	this.check = function(letter){
		if(app._woord.indexOf(letter) == -1){
			return false;
		}
		else{
			for(i in app._woord){
				if(app._woord[i] == letter){
					app._mask[i] = letter;
				}
			}
			// and return true
			return true;
		}
	}
	
	this.wordComplete = function(){
		if(this._mask.indexOf(null) > -1){
			return false;
		}
		else{
			return true;
		}
	}
	
	
	this.kiesWoord();
}