angular.module("allDirectives", ["ngSanitize"])

	.directive("dealButton", function() {

		return {
			restrict: 'E',
			replace: true,
			template: "<button class='center pointer' ng-click='gameStart()'>deal</button>"
			//link: link
		}
	})

	
	.directive("displayCards", function() {
		
		function link(scope, elem, attr) {
			//console.log(scope.hand);
		
			// change face cards & Ace to letters
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
			
			// change to suit symbol and corresponding red/black colors
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

			// format card to display properly
			function formatCard(arr) {
				for (card in arr) {
					arr[card].value = faceCards(arr[card].value);
					//console.log(scope.hand[card].value);
					//scope.hand[card].suit = suitAndColor(scope.hand[card].suit);
					arr[card] = suitAndColor(arr[card]);
					//console.log(scope.hand[card]);
				}
			}
			
			scope.$watch('hand', function(newValue, oldValue) {
				formatCard(newValue);
			});
			
		}

		return {
			restrict: 'E',
			replace: true,
			scope: {
				hand: '=',
			},
			//template: '<ul><li class="hand inlineBlock" ng-repeat="card in hand"><div class="cardTop inlineBlock {{card.color}}"><p>{{card.value}}</p><p ng-bind-html="card.suit">{{card.suit}}</p></div><div class="cardBottom inlineBlock {{card.color}}"><p>{{card.value}}</p><p ng-bind-html="card.suit">{{card.suit}}</p></div></li></ul>',
			templateUrl: 'views/cardDisplay.html',
			link: link
		}
	});
