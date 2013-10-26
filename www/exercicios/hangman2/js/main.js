$(function(){
	
	var canvas = document.getElementById('gallowCanvas');
	var lives = 10;
	var healthBar = new HealthBar(canvas, lives);

	initKeyboard();
	
	function initKeyboard(){
		// Maak een nieuw random woord aan
		woord = new Woord();
		
		// Zet het maskeerde woord op het scherm
		$('#word_to_guess').html('<p>'+woord.getMaskedWord()+'</p>');
		
		// Maak een nieuw keyboard aan
		kb = new Keyboard({
			
			keyboard_container: $('#keyboard'), // Waar komt het keyboard in?
			
			callback: function(letter){	// Welke functie gaan we uitvoeren?
				if(woord.check(letter)){
					// letter zit in het woord
					$('#word_to_guess').html('<p>'+woord.getMaskedWord()+'</p>');
					
					if(woord.wordComplete()){
						// Hoera! Je hebt gewonnen!
						alert('OYEAH');
					}
				}
				else{ //helaas letter zit niet in het woord
					healthBar.lose_life(); //leventje minder
					
					if(healthBar.num_lives < 1){//bij 0 levens game over!
						document.getElementById('FX1').play();	
					}					
				}
			}
		});
		
		kb.draw();
	}
});