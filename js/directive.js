angular.module("allDirectives", ["ngSanitize"])

	.directive("dealCards", function() {
		
		function link(scope, elem, attr) {
				
			elem.on('click', function() {
				//start game on click
				scope.gameStart();
			});		
		}
		
		return {
			restrict: 'A',
			link: link
		}
	})

	
	.directive("displayCards", function() {
		
		function link(scope, elem, attr) {
			//console.log(scope.hand);
/*		
			scope.$watch('hand', function(newValue, oldValue) {
				console.log(newValue, oldValue);
				//hand = newValue;
			});
*/	
			function faceCards(num) {
				switch(num) {
					case 11:
						num = 'J';
						return num;
					case 12:
						num = 'Q';
						return num;
					case 13:
						num = 'K';
						return num;
					case 14:
						num = 'A';
						return num;
					default:
						return num;
				}
			}
			
			function suitAndColor(suit) {
				switch(suit) {
					case 'Club':
						suit = '&clubs;';
						return suit;
					case 'Diamond':
						suit = '&diams;';
						return suit;
					case 'Heart':
						suit = '&hearts;';
						return suit;
					case 'Spade':
						suit = '&spades;';
						return suit;
				}
			}

			for (card in scope.hand) {
				scope.hand[card].value = faceCards(scope.hand[card].value);
				//console.log(scope.hand[card].value);
				scope.hand[card].suit = suitAndColor(scope.hand[card].suit);
				//console.log(scope.hand[card].suit);
			}
			
		}

		return {
			restrict: 'E',
			replace: true,
			scope: {
				hand: '=',
			},
			template: '<ul><li class="inlineBlock hand" ng-repeat="card in hand"><p>{{card.value}}</p><p ng-bind-html="card.suit">{{card.suit}}</p></li></ul>',
			//templateUrl: 'views/cardDisplay.html',
			link: link
		}
	});
