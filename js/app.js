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
	var score;

	// store suits and values into arrays
	for (prop in hand) {
		suits.push(hand[prop].suit);
		values.push(hand[prop].value);
	}
	// sort values
	values.sort(function(a,b) {return a-b});
	console.log(values);

	// check trips, 2-pair, 1-pair and high card
	function isTrips() {
		for (var i=0;i<3;i++) {
			console.log(values[i], values[i+1], values[i+2]);
			if (values[i] == values[i+1] && values[i+1] == values[i+2])
				return true;
		}
		return false;
	}


	// check 4-of-a-kind
	function is4ofaKind() {
		var tally = 0;
		for (var i=0;i<values.length-1;i++) {
			//console.log(values[i], values[i+1]);
			if (values[i] == values[i+1])
				tally++;
		}
		if (tally==3)
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
		console.log(values);
		
		// Ace-high straight check
		value = values[4]-values[3]+(values[2]-values[1])-values[0];
		console.log(value);
		if (value == 1)
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
	//if (isStraight() && isFlush)
		//return 9;	// straight flush
	
	return isTrips();
}

// game logic constructor
function gameStart() {

	var player1 = new Player("alpha");
	var player2 = new Player("omega");

	var cards = new Cards();
	cards.makeDeck();
	cards.shuffleDeck();
	
	//player1.hand = cards.dealHand(5);
	//player2.hand = cards.dealHand(5);

/* for testing */
	player1.hand = [
		{"suit": "Diamond", "value": 2},
		{"suit": "Diamond", "value": 5},
		{"suit": "Diamond", "value": 13},
		{"suit": "Diamond", "value": 9},
		{"suit": "Diamond", "value": 6}
	];
	
	console.log(player1.hand);
	//console.log(player2.hand);
	
	player1.score = handCalculate(player1.hand);
	//player2.score = handCalculate(player2.hand);
	console.log(player1.score);
	//console.log(player2.score);
}

// start game
gameStart();




























