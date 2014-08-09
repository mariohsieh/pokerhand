angular.module("allDirectives", [])

	.directive("dealCards", function() {
		function link(scope, elem, attr) {
				
				elem.on('click', function() {
					alert('hi');
				});		
		}
		
		return {
			restrict: 'A',
			link: link
		}
	});
