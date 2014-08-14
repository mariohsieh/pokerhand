angular.module("allDirectives", [])

	.directive("dealCards", function() {
		
		function link(scope, elem, attr) {
				
			elem.on('click', function() {
				
				//start game on click
				scope.gameStart();
				//console.log(scope.p1.hand);	
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
				console.log(newValue);
				hand = newValue;
			});
*/		
;
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
			
			for (card in scope.hand) {
				scope.hand[card].value = faceCards(scope.hand[card].value);
				//console.log(scope.hand[card].value);
			}
			
		}

		return {
			restrict: 'E',
			replace: true,
			scope: {
				hand: '=',
			},
			//template: '<ul><li class="inlineBlock hand" ng-repeat="card in hand"><span>{{card.value}}</span></li></ul>',
			templateUrl: 'views/cardDisplay.html',
			link: link
		}
	});
