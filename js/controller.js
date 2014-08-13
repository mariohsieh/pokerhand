angular.module("allControllers", [])

	.controller("mainCtrl", function($scope, Card, Player, CalcHand, CompareHand) {
		
		// game logic
		$scope.gameStart = function() {

			$scope.p1 = new Player("alpha");
			$scope.p2 = new Player("omega");

			cards = new Card();
			cards.makeDeck();
			cards.shuffleDeck();
			
			$scope.p1.hand = cards.dealHand(5);
			$scope.p2.hand = cards.dealHand(5);

		/* for testing 
			$scope.p1.hand = [
				{"suit": "Heart", "value": 2},
				{"suit": "Spade", "value": 8},
				{"suit": "Spade", "value": 9},
				{"suit": "Heart", "value": 11},
				{"suit": "Club", "value": 12}
			];
			$scope.	p2.hand = [
				{"suit": "Diamond", "value": 4},
				{"suit": "Heart", "value": 5},
				{"suit": "Spade", "value": 6},
				{"suit": "Diamond", "value": 11},
				{"suit": "Heart", "value": 13}
			];	 
		*/
		
			console.log($scope.p1.hand);
			console.log($scope.p2.hand);
			
			$scope.p1.info = new CalcHand($scope.p1.hand);
			$scope.p2.info = new CalcHand($scope.p2.hand);
			console.log($scope.p1.info);
			console.log($scope.p2.info);

			var compareHand = new CompareHand($scope.p1.info, $scope.p2.info);

		}

		// start game
		$scope.gameStart();
	});

