// reference for toolbox
// app.js: our main javascript file for this app
"use strict";




//When document is ready
$(document).ready(function() {
    var gameBoard = $('#game-board');
    var tileAll = [];
	var i;
    var tileArray = [];
    var tileShuffled = [];
    var tileData1;
    var tileData2;
    var timer; 
    var count = 0;

    //Lists tiles with attributes
	for (i = 1; i <= 32; i++) {
	    tileAll.push({
	        tileNum: i,
	        src: './img/tile' + i + '.jpg',
	        flipped: false,
	        matched: false
	    });
	}

	//Starts game on start game button click
    $('#start-game').click(function() {
        window.clearInterval(timer);
        gameBoard.empty();
        var matchedNum = 0;
        $('#matched').text(matchedNum);
        var remainingNum = 8;
        $('#remaining').text(remainingNum);
        var missedNum = 0;
        $('#missed').text(missedNum);

        //Picks 8 tiles, duplicates, and shuffles
        tileAll = _.shuffle(tileAll);
        for (i = 0; i <= 14; i += 2) {
            tileArray[i] = tileAll[i];
            tileArray[i + 1] = _.clone(tileAll[i]);
        }
        tileShuffled = _.shuffle(tileArray);

        //Creates tiles/board
        var newTile;
        _.forEach(tileShuffled, function(tile) {
            tile.flipped = false;
            newTile = $(document.createElement('img'));
            newTile.attr('width', '100%');
            newTile.attr('class', 'col-md-3 col-xs-3');
            newTile.attr('src', 'img/tile-back.png');
            newTile.attr('alt', 'tile ' + tile.tileNum);

            newTile.data('tile', tile);
            gameBoard.append(newTile);
        });   

        //Tests tiles in accordance to game
        var rep = true;
        $('#game-board img').click(function() {
            var clickedImage = $(this);
            var tile = clickedImage.data('tile');
            if (tile.matched || tile.flipped || !rep) {
                return; //not clickable
            }
            if (count == 0) {
                count++;
                tileData1 = clickedImage;
                tileData2 = tile;
                flipTile(tile, clickedImage);
            }
            if (count == 2) {
                count = 0;
                rep = false;
                var clickedImage2 = clickedImage;
                flipTile(tile, clickedImage);
                if (tileData2.tileNum == tile.tileNum) {
                    tileData2.matched == true;
                    clickedImage.matched == true;
                    tileData1.addClass('matched');
                    clickedImage.addClass('matched');
                    console.log(tileData1);
                    matchedNum++;
                    $('#matched').text(matchedNum);
                    remainingNum--;
                    $('#remaining').text(remainingNum);

                    // executes if user wins
                    if (matchedNum == 8) {
                        stopTimer(timer);
                        $('#winScreenModal').modal('show');
                        $('#congrats').addClass('zoomIn animated');
                    }
                } else {
                    missedNum++;
                    $('#missed').text(missedNum);
                    setTimeout(function() {
                        flipTile(tileData1.data('tile'), tileData1);
                        flipTile(tile, clickedImage);
                    }, 800);
                }
                count = 0;
                setTimeout(function() { rep = true;}, 800);
                return;
            }
            count++;
        });

		//Time counter
        var startTime = Date.now();
        timer = window.setInterval(function() {
            var elapsedSeconds;
            elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            $('#elapsed-seconds').text(elapsedSeconds + ' second');
        }, 1000);
    });

});

//Clears timer
function stopTimer(timer) {
    window.clearInterval(timer);
}

//Flips tile depending on status/game
function flipTile(tile, img) {
    img.fadeOut(200, function() {
        if (tile.flipped) {
            img.attr('src', 'img/tile-back.png');
        } else {
            img.attr('src', tile.src);
        }
        tile.flipped = !tile.flipped;
        img.fadeIn(100);
    });
}

//Slides instructions overboard to follow along while playing or hide if not needed
$( "#instructions" ).click(function() {
	$( "#instructionToggle" ).slideToggle( "slow" )
});
