angular.module("allControllers", [])

	.controller("mainCtrl", function($scope, Card, Player, CalcHand, CompareHand) {

		// game logic
		$scope.gameStart = function() {
			
			var p1 = new Player("alpha");
			var p2 = new Player("omega");

			var cards = new Card();
			cards.makeDeck();
			cards.shuffleDeck();
			
			p1.hand = cards.dealHand(5);
			p2.hand = cards.dealHand(5);
			
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
		
			console.log(p1.hand);
			console.log(p2.hand);
			
			p1.score = new CalcHand(p1.hand);
			p2.score = new CalcHand(p2.hand);
			console.log(p1.score);
			console.log(p2.score);
			
			var compareHand = new CompareHand(p1.score, p2.score);
			
			$scope.p1 = p1;
			console.log(p1.score.score);
			//$scope.p2 = p2;
			
		}

		// start game
		//gameStart();

		// testing 
		$scope.test = {'name': 'gamma', 'score': 10};

	});
