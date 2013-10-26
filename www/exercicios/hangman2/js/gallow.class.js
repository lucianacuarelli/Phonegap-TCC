function Gallow(canvas){
	
	this.canvas = canvas;
	this.piece = canvas.getContext("2d");
	this.pieces = [[10, 10, 100, 10],
				   [100, 100, 10, 100]];
	this.currentPiece = 0;
	
	console.log(canvas.width);
}

Gallow.prototype.drawNextPiece = function(){

	var piece = new Piece(this.currentPiece);

    this.piece.fillStyle = "rgb(0,0,0)";
    //this.piece.fillRect();
	this.currentPiece++;
};