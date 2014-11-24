/* app.js
* main script file for our little application
* */

"use strict";

function onReady() {
	//var htmlDoc = document.getElementById('tile');

	var i;
	var tileArray;
	var tileString = [];
	tileArray = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
				  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);
	console.log(tileArray);
	for(i =  0; i <= 31; i++) {
		tileString[i] = ".\\img\\tile" + tileArray[i];
	}
	console.log(tileString);
	//=======TRYING THIS OUT========
	/*if(htmlDoc.className = 'tile') {
		htmlDoc.attr('src', tileString[i]);
	}*/
	
	var tile = 'img/sec1.jpg'//'any kind of data assoc with element';
	var info = 'some other data';
	//create and configure a new <img> element...
	var newTile = $(document.createElement('img'));

	newTile.attr('src', 'img/background.jpg');
	newTile.attr('alt', 'photo of nature');
	newTile.attr('width', '250px');
	
	//use the .data() method to associate extra data with HTML elements
	newTile.data('assocTile', tile) //first param is a key
	newTile.data('tileInfo', info) //second param is a value

	//when an image in game-board is cicked
	$('#tile img').click(function(){
		//remember that 'this' refers to the DOM element that raised the event
		//wrapped in jQuery $() to get more functionality
		var clickedImage = $(this);
		var tileData1 = clickedImage.data('assocTile');//var to data
		var tileData2 = clickedImage.data('tileInfo');

		clickedImage.attr('src', tileData1);//on event chang attr data
		clickedImage.attr('alt', tileData2);

		console.log(tileData1);//shows in log
		console.log(tileData2);
	});
}

//Listens to the DOM for ready
document.addEventListener('DOMContentLoaded', onReady);