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
			
			function suitAndColor(obj) {
				switch(obj.suit) {
					case 'Club':
						obj.suit = '&clubs;';
						obj.color = 'black';
						return obj;
					case 'Diamond':
						obj.suit = '&diams;';
						obj.color = 'red';
						return obj;
					case 'Heart':
						obj.suit = '&hearts;';
						obj.color = 'red';
						return obj;
					case 'Spade':
						obj.suit = '&spades;';
						obj.color = 'black';
						return obj;
				}
			}

			for (card in scope.hand) {
				scope.hand[card].value = faceCards(scope.hand[card].value);
				//console.log(scope.hand[card].value);
				//scope.hand[card].suit = suitAndColor(scope.hand[card].suit);
				scope.hand[card] = suitAndColor(scope.hand[card]);
				//console.log(scope.hand[card]);
			}
			
		}

		return {
			restrict: 'E',
			replace: true,
			scope: {
				hand: '=',
			},
			//template: '<ul><li class="hand inlineBlock" ng-repeat="card in hand"><div class="inlineBlock {{card.color}}"><p>{{card.value}}</p><p ng-bind-html="card.suit">{{card.suit}}</p></div></li></ul>',
			templateUrl: 'views/cardDisplay.html',
			link: link
		}
	});
