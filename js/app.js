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

// poker hand calculator function
function handCalculate(obj) {
	var hand = obj;

	var suits = [];
	var values = [];

	for (prop in hand) {
		suits.push(hand[prop].suit);
		values.push(hand[prop].value);
	}

	//console.log(suits, values);


	// check if all suits are the same
	function isFlush() {
		for (var i=0;i<suits.length-1;i++) {
			if (suits[i] !== suits[i+1])
				return false;
		}
		return true;
	}
	
	
	
	return isFlush();
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
		{"suit": "Diamond", "value": "1"},
		{"suit": "Diamond", "value": "2"},
		{"suit": "Diamond", "value": "3"},
		{"suit": "Diamond", "value": "4"},
		{"suit": "Diamond", "value": "5"}
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




























