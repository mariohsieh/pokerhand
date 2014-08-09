angular.module("allControllers", [])

	.controller("mainCtrl", function($scope, Card, Player, CalcHand, CompareHand) {

		// game logic
		function gameStart() {

			var player1 = new Player("alpha");
			var player2 = new Player("omega");

			var cards = new Card();
			cards.makeDeck();
			cards.shuffleDeck();
			
			player1.hand = cards.dealHand(5);
			player2.hand = cards.dealHand(5);

		/* for testing 
			player1.hand = [
				{"suit": "Heart", "value": 3},
				{"suit": "Spade", "value": 3},
				{"suit": "Spade", "value": 10},
				{"suit": "Heart", "value": 3},
				{"suit": "Club", "value": 14}
			];
			player2.hand = [
				{"suit": "Diamond", "value": 5},
				{"suit": "Heart", "value": 14},
				{"suit": "Spade", "value": 5},
				{"suit": "Diamond", "value": 5},
				{"suit": "Heart", "value": 13}
			];	 
		*/
		
			console.log(player1.hand);
			console.log(player2.hand);
			
			player1.score = new CalcHand(player1.hand);
			player2.score = new CalcHand(player2.hand);
			console.log(player1.score);
			console.log(player2.score);

			var compareHand = new CompareHand(player1.score, player2.score);
		}

		// start game
		gameStart();

	});
