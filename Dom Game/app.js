var scores, roundScore, activePlayer, dice;
var gamePlaying = true;
initFun();
document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if(gamePlaying){
	//random number
	dice = Math.floor(Math.random()*6) + 1;
	
	//Display result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-'+ dice + '.png';

	//update the round score
	if(dice > 1){
		//add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}else{
		//change active Player
		nextPlayer();
	}
}	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		//Add current score to global score
		scores[activePlayer] += roundScore;

		//update information
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		
		//get the input from user
		var input = document.querySelector('.final-score').value;
		var winScore;
		if(input){
			winScore = input;
		}else {
			winScore = 100;
		}

		//check if the person won the game
		if(scores[activePlayer] >= winScore){
			document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else{
			//next player
			nextPlayer();
		}
	}

});

function nextPlayer(){

		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}
//click on new button and calling initFun method
document.querySelector('.btn-new').addEventListener('click', initFun);

function initFun(){
		gamePlaying = true;
		scores = [0,0];
		roundScore= 0;
		activePlayer = 0;			// 0: active

		document.querySelector('.dice').style.display = 'none';
		document.getElementById('score-0').textContent = '0';
		document.getElementById('score-1').textContent = '0';
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		document.getElementById('name-0').textContent = 'Player 1';
		document.getElementById('name-1').textContent = 'Player 2';

		document.querySelector('.player-0-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('winner');
		document.querySelector('.final-score').value = 0;

}
