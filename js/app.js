/* app.js
* main script file for our little application
* */

"use strict";

function onReady() {
	//var htmlDoc = document.getElementById('tile');
	var gameBoard = $('#game-board');
	var i;
	var tileInfo = [];
	var tileSrc = [];
	var doubleInfo = [];
	var doubleSrc = [];
	var tileArray = [];
	var count = 0;

	var tileAll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
				  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

	var tileData1;
	var tileData2;
	var tileData3;
	var tileData4;
	var match;

	for(i = 0; i <= 14; i += 2) {
		tileArray[i] = tileAll[i];
		tileArray[i + 1] = tileAll[i];
	}
	tileArray = _.shuffle(tileArray);
	console.log(tileAll);
	console.log(tileArray);

	for(i =  0; i <= 15; i++) {
		tileInfo[i] = "tile" + tileArray[i];
		tileSrc[i] = ".\\img\\tile" + tileArray[i] + ".jpg";
	}
	console.log(tileInfo);
	console.log(tileSrc);

	for(i = 0; i <= 15; i++) {
		var tile = tileSrc[i];
		var info = tileInfo[i];
		//create and configure a new <img> element...
		var newTile = $(document.createElement('img'));
		newTile.attr('src', '.\\img\\tile-back.png');
		newTile.attr('alt', 'random');
		newTile.attr('width', '100%');
		newTile.attr('class', 'col-md-3 col-xs-3')

		//use the .data() method to associate extra data with HTML elements
		newTile.data('assocTile', tile) //first param is a key
		newTile.data('tileInfo', info) //second param is a value

		gameBoard.append(newTile);

	}

	$('#game-board img').click(function(){
		var clickedImage = $(this);
		count++;
		console.log(count);
		tileData1 = clickedImage.data('assocTile');//var to data
		var tileData2 = clickedImage.data('tileInfo');
		clickedImage.attr('src', tileData1);//on event chang attr data
		clickedImage.attr('alt', tileData2);

		//Tests click 1 vs click 2 to see if matching
		if(count % 2 == 1) {
			tileData3 = tileData1;
		}
		if(count % 2 == 0) {
			if(tileData1 == tileData3) {
				match = true;
			} else if (tileData1 != tileData3) {
				match = false;
			}
			console.log(match);
		}
		console.log(tileData1);
		console.log(tileData3);
	});
}

//Listens to the DOM for ready
document.addEventListener('DOMContentLoaded', onReady);