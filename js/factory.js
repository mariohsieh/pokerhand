angular.module("allFactories", [])
	///////////////////////////////
	// cards constructor
	.factory("Card", function() {
		return function() {
			// create all cards with double for loop
			this.makeDeck = function() {
				var suits = ['Club', 'Diamond', 'Heart', 'Spade'];
				this.deck = [];
				for (suit in suits) {
					for (var i=2;i<15;i++)
						this.deck.push({suit: suits[suit], value: i});
				}
			}
			
			// shuffles the cards
			this.shuffleDeck = function() {
				var newDeck = [];

				// loop to select random cards and adding to new deck
				do {
					var randomIndex = Math.floor(Math.random()*this.deck.length);
					var randomCard = this.deck[randomIndex];
					this.deck.splice(randomIndex,1);
					newDeck.push(randomCard);
				} while (this.deck.length > 0 );
				this.deck = newDeck; // set new deck with shuffled cards
			}

			// deals the number of cards set by the parameter
			this.dealHand = function(num) {

				var hand = [];
				for (var i=0;i<num;i++) {
					hand.push(this.deck.pop());
				}
				return hand;
			}
		}
	})
	///////////////////////////////	
	// player constructor
	.factory("Player", function() {
		return function(name) {
			this.name = name;
		}
	})
	
	///////////////////////////////
	// determine pokerhand logic
	.factory("CalcHand", function() {
		return function(obj) {
			var hand = obj;
			var suits = [];
			var values = [];

		// store suits and values into arrays
		for (prop in hand) {
			suits.push(hand[prop].suit);
			values.push(hand[prop].value);
		}
		// sort values
		values.sort(function(a,b) {return a-b});

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// check for different hands

		// check 4-of-a-kind
		function isQuads() {
			for (var i=0;i<2;i++) {
				if (values[i] == values[i+1] &&
						values[i+1] == values[i+2] &&
						values[i+2] == values[i+3])
				return true;
			}
			return false;
		}

		// check full house/trips
		function isFullHouse() {
			for (var i=0;i<3;i++) {
				//console.log(values[i], values[i+1], values[i+2]);
				if (values[i] == values[i+1] && values[i+1] == values[i+2]) {
					if (values[0] !== values[1] || values[3] !== values[4])
						return "trips";	// trips
					else
						return true; // full house
				}
			}
			return false;
		}

		// check 2-pair, 1-pair, high card
		function isPair(num) {
			var goal = num--;
			var tally = 0;
			
			for (var i=0;i<4;i++) {
				if (values[i] == values[i+1])
					tally++;
			}
			if (tally == goal)
				return true;
			else
				return false;
			}

			// check flush
			function isFlush() {
				for (var i=0;i<suits.length-1;i++) {
					if (suits[i] !== suits[i+1])
						return false;
				}
				return true;
			}
		
			// check straight
			function isStraight() {
				// low straight check
				if (values[0] == 2 &&
						values[1] == 3 &&
						values[2] == 4 &&
						values[3] == 5 &&
						values[4] == 14)
					return true;
				else {
					// loop to check if difference is 1 between cards
					for (var i=0;i<values.length-1;i++) {
						if ((values[i+1]-values[i]) !== 1)
							return false;
					}
					return true;
				}
			}

			// return a score for each type of hand	
			getScore = function() {	
				if (isFlush() && isStraight()) {
					score = 9;
					type = "straight flush";	// straight flush
				} else if (isQuads()) {
					score = 8;
					type = "4 of a kind";	// 4-of-a-kind
				} else if (isFullHouse() == true) {
					score = 7;
					type = "full house";	// full house
				} else if (isFlush()) {
					score = 6;
					type = "flush";	// flush
				} else if (isStraight()) {
					score = 5;
					type = "straight"	// straight
				} else if (isFullHouse() == "trips") { 
					score = 4;
					type = "trips";	// trips
				} else if (isPair(2)) {
					score = 3;
					type = "two pair";	// two pair
				} else if (isPair(1)) {
					score = 2;
					type = "one pair";	// one pair
				} else {
					score = 1;
					type = "high card";	// high card
				}
			}
		
			getScore();
			return {"hand": values,"score": score,"type": type};
		}
	})
	
	.factory("CompareHand", function() {
		return function(obj1, obj2) {
			function compareQuads() {
				if (obj1.hand[2] > obj2.hand[2])
					return console.log("player 1 wins");
				else
					return console.log("player 2 wins");
			}
			
			// compare trips
			function compareTrips() {
				for (var i=4;i>1;i--) {
					if (obj1.hand[i] == obj1.hand[i-1] &&
							obj1.hand[i-1] == obj1.hand[i-2])
						trips1 = obj1.hand[i];
					if (obj2.hand[i] == obj2.hand[i-1] &&
							obj2.hand[i-1] == obj2.hand[i-2])
						trips2 = obj2.hand[i];
				}
				if (trips1 > trips2)
					return console.log("player 1 wins");
				if (trips2 > trips1)
					return console.log("player 2 wins");
				//compareCard(-1);
			}
			// compare two pairs
			function compare2pair() {
				var pair1 = [];
				var pair2 = [];
				
				for (var i=4;i>0;i--) {
					if (obj1.hand[i] == obj1.hand[i-1])
						pair1.push(obj1.hand[i]);
					if (obj2.hand[i] == obj2.hand[i-1])
						pair2.push(obj2.hand[i]);
				}
				if (pair1[0] < pair2[0])
					return console.log("player 2 wins");
				if (pair1[0] > pair2[0])
					return console.log("player 1 wins");
				if (pair1[1] < pair2[1])
					return console.log("player 2 wins");
				if (pair1[1] > pair2[1])
					return console.log("player 1 wins");
				compareCard(-1);
			}
			// compare single pair
			function comparePair() {
				for (var i=4;i>0;i--) {
					if (obj1.hand[i] == obj1.hand[i-1])
						var pair1 = obj1.hand[i];
					if (obj2.hand[i] == obj2.hand[i-1])
						var pair2 = obj2.hand[i];
				}
				if (pair1 > pair2)
					return console.log("player 1 wins");
				if (pair1 < pair2)
					return console.log("player 2 wins");
				compareCard(-1);
			}
			
			function compareCard(num) {
				for (var i=4;i>num;i--) {
					if (obj1.hand[i] < obj2.hand[i]) {
						//console.log(obj1.hand[i] , obj2.hand[i])
						return console.log("player 2 wins");
					}
					if (obj1.hand[i] > obj2.hand[i]) {
						//console.log(obj1.hand[i] , obj2.hand[i])
						return console.log("player 1 wins");
					}	
				}
				return console.log("tie game");
			};

			// check for bigger hand, if tie, then go to tie breakers
			if (obj1.score > obj2.score)
				console.log("player 1 wins");
			else if (obj1.score < obj2.score)
				console.log("player 2 wins");
			else {
				//console.log("tie game");
				// code for tie breaker
				switch(obj1.score) {
					case 9:
						compareCard(3);
						break;
					case 8:
						compareQuads();
						break;
					case 7:
						compareTrips();
						break;
					case 6:
						compareCard(-1);
						break;
					case 5:
						compareCard(3);
						break;
					case 4:
						compareTrips();
						break;
					case 3:
						compare2pair();
						break;
					case 2:
						comparePair();
						break;
					case 1:
						compareCard(-1);
						break;				
					default:
						console.log("tie game");
				}
			}	
		}
	});




