/**
 * Tabuleiro
 */
var neshaug = neshaug || {}; ( function() {

		function Board() {
			this.rows = 0;
			this.columns = 0;

			//Segunda array com chaves tile
			this._grid = null;
			this.setSize(0, 0);
		}


		Board.prototype.getGrid = function() {
			return this._grid;
		};

		/**
		 * Sets a piece (key) at the given row and column position.
		 * @method
		 * @param {Number} key The tile key
		 * @param {Number} row
		 * @param {Number} column
		 */
		Board.prototype.setPiece = function(key, row, column) {
			if (row > this.rows || row < 0) {
				throw new Error("row is outside of the board");
			}
			if (column > this.columns || column < 0) {
				throw new Error("column is outside of the board");
			}
			this._grid[row][column] = key;
			key.selected = false;
		};

		Board.prototype.getPiece = function(row, column) {
			if (this._grid.length > row && this._grid[row].length > column) {
				return this._grid[row][column];
			}
		};

		/**
		 * Seta o número de linhas e colunas que o tabuleiro terá
		 * @method
		 * @param {Number} rows - Linhas
		 * @param {Number} columns - Colunas
		 */
		Board.prototype.setSize = function(rows, columns) {
			this.rows = rows;
			this.columns = columns;
			var i = 0, j = 0;
			this._grid = [];
			this._grid.push([]);
			for ( i = 0; i < rows; i++) {
				this._grid[i] = [];
				for ( j = 0; j < columns; j++) {
					this._grid[i][j] = 0;
				}
			}
		};

		// Exporta
		neshaug.Board = Board;

	}());
