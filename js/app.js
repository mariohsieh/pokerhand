// cards constructor
function Cards() {
	
	// create all cards with double for loop
	this.makeDeck = function() {
		var suits = ['Club', 'Diamond', 'Heart', 'Spade'];
		this.deck = [];
		for (suit in suits) {
			for (var i=1;i<14;i++)
				this.deck.push({suit: suits[suit], value: i});
		}
	}
	
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
	
	this.dealHand = function(num) {

		var hand = [];
		for (var i=0;i<num;i++) {
			hand.push(this.deck.pop());
		}
		return hand;
	}		
}		

// player constuctor
function Player(name) {
	this.name = name;
}

// determine poker hand function
function handCalculate(obj) {
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
	//console.log(values);

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// check for different hands
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// check 4-of-a-kind
	function is4ofaKind() {
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
				if (values[0] == values[1] || values[3] == values[4])
					return true;	// full house
				else
					return "trips"; // trips
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
		// Ace-high straight check
		//value = values[4]-values[3]+(values[2]-values[1])-values[0];
		//console.log(value);
		if (values[0] == 1 &&
				values[1] == 10 &&
				values[2] == 11 &&
				values[3] == 12 &&
				values[4] == 13)
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
	this.getScore = function() {	
		if (isFlush() && isStraight())
			return {"score": 9, "type": "straight flush"};	// straight flush
		else if (is4ofaKind())
			return {"score": 8, "type": "4 of a kind"};	// 4-of-a-kind
		else if (isFullHouse() == true)
			return {"score": 7, "type": "full house"};	// full house
		else if (isFlush())
			return {"score": 6, "type": "flush"};	// flush
		else if (isStraight())
			return {"score": 5, "type": "straight"};	// straight
		else if (isFullHouse() == "trips")
			return {"score": 4, "type": "trips"};	// trips
		else if (isPair(2))
			return {"score": 3, "type": "two pair"};	// two pair
		else if (isPair(1))
			return {"score": 2, "type": "one pair"};	// one pair
		else
			return {"score": 1, "type": "high card"};	// high card
	}
	return this.getScore();
}

// game logic constructor
function gameStart() {

	var player1 = new Player("alpha");
	var player2 = new Player("omega");

	var cards = new Cards();
	cards.makeDeck();
	cards.shuffleDeck();
	
	player1.hand = cards.dealHand(5);
	//player2.hand = cards.dealHand(5);

/* for testing 
	player1.hand = [
		{"suit": "Heart", "value": 8},
		{"suit": "Heart", "value": 6},
		{"suit": "Spade", "value": 12},
		{"suit": "Heart", "value": 4},
		{"suit": "Heart", "value": 7}
	];
*/	
	console.log(player1.hand);
	//console.log(player2.hand);
	
	player1.score = handCalculate(player1.hand);
	//player2.getScore = handCalculate(player2.hand);
	
	console.log(player1.score);
	//console.log(player2.score);
}

// start game
gameStart();




























