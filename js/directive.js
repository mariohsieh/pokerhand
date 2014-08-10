angular.module("allDirectives", [])

	.directive("dealCards", function() {
		
		function link(scope, elem, attr) {
				
			elem.on('click', function() {
				scope.gameStart();
			});		
		}
		
		return {
			restrict: 'A',
			link: link
		}
	})
	
	
	.directive("displayCards", function() {
		
		//function link(scope, elem, attr) {
			//console.log(scope.p1);
		//}

		
		return {
			restrict: 'E',
			scope: {
				hand: '='
			},
			template: '{{hand}}'
			//link: link
		}
	});
