// list of variables and arrays
const suits = ['♠','♥','♦','♣']
const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

let deck = []

let communityTable = []
let communityVisible = 0

let pot = 0
let userWallet = 2000
let com1Wallet = 5000
let com2Wallet = 5000

let userHand = []
let com1Hand = []
let com2Hand = []

let com1Folded = false;
let com2Folded = false;


//list of selectors
const pokerTable = document.getElementById('poker-table')

const community = pokerTable.querySelector('.community-board')
const user = pokerTable.querySelector('.player-hand')
const com1 = pokerTable.querySelector('.com-hand-1')
const com2 = pokerTable.querySelector('.com-hand-2')

const potDisplay = pokerTable.querySelector('#pot')
const userWalletDisplay = pokerTable.querySelector('#user-wallet')
const com1WalletDisplay = pokerTable.querySelector('#com1-wallet')
const com2WalletDisplay = pokerTable.querySelector('#com2-wallet')

const checkButton = pokerTable.querySelector('#Check');
const dealButton = pokerTable.querySelector('#deal')
const betButtons = pokerTable.querySelectorAll('#bet-10, #bet-25, #bet-50, #bet-100, #bet-500')


// Start of the game
dealButton.addEventListener('click', startRound); // the listener works when you hit the deal button

function startRound() { // this is the function the starts
com1Folded = false; // the computer's hands start folded false so that we can use the computer react function later
com2Folded = false;
com1.textContent = 'Hidden, Hidden'; // the computer's hands are suppose to be hidden until the end of the round
com2.textContent = 'Hidden, Hidden';

pot = 0; 

refreshDisplays(); //these functions run at the start of the game
buildDeck();
dealPlayerCards();
dealComputerCards();
dealCommunityCards();
}


function refreshDisplays() { // this function are what shows up on the webpages
userWalletDisplay.textContent = `$${userWallet}` // the first dollar sign is the symbol for the money and the second $ sign is part of the 'template literal placeholder'  
com1WalletDisplay.textContent = `$${com1Wallet}`
com2WalletDisplay.textContent = `$${com2Wallet}`
potDisplay.textContent = `$${pot}`
}


betButtons.forEach(button => { // this is the function for all the bet amount buttons
button.addEventListener('click', () => { 
const betAmount = +button.textContent.replace('$', ''); // this takes the value of the buttons. + turns the button into a number, .textContent extracts the text insdide the button and .replace ('$', '') replaces the dollar sign to an empty string

if (userWallet < betAmount) return; // if the user or player 1 doesn't have enough money the button function doesn't start or do anything

userWallet -= betAmount; // remove the bet amout from player 1's wallet
pot += betAmount; // add the bet amount to the pot 

computersReactToPlayerBet(betAmount); //the buttons also trigger these functions
refreshDisplays();
revealNextCommunityCard(); 
  });
});


checkButton.addEventListener('click', () => {  // the check button also triggers the following functions. Right now the check button makes the cumputer's reaction imediate but in a finished version i would have the computers wait until it's their turn to make a move
computersReactToPlayerBet(0); 
refreshDisplays()
revealNextCommunityCard();
});


function buildDeck() { // this function builds the cards that get dealt
deck = []
suits.forEach(function(suit) { 
ranks.forEach(function(rank) {
let card = rank + " of " + suit
deck.push(card)
    })
  })
}


function dealCommunityCards() {  // this function makes the community table 
communityTable = [] // we're altering the empty table array
communityTable.push(deck.pop()) // the function is popping the card out of the deck array and then pushes it to the end of the communityTable array
communityTable.push(deck.pop())
communityTable.push(deck.pop())
communityTable.push(deck.pop())
communityTable.push(deck.pop())
communityVisible = 2 // all poker tables show the first two cards, the rest are hidden
buildCommunity() // the fucntion also calls on the buildCumminity function
}


function buildCommunity() {  
let communityCards = "" // new variable with an empty string
for (let i = 0; i < communityVisible; i++) { // loops through each index in the communityVisible array once
communityCards += communityTable[i] // takes the current index in the communityTable that the loop is on and adds it to the communityCards string
if (i < communityVisible - 1) {  // 
communityCards += ", "
  }
}
community.textContent = communityCards
}


function revealNextCommunityCard() { // 
if (communityVisible < communityTable.length) {
communityVisible += 1
buildCommunity()
  }
}


function dealPlayerCards() { 
  userHand = []
  userHand.push(deck.pop())
  userHand.push(deck.pop())
  user.textContent = userHand.join(', ') // the .join method turns the the items in the array into one string and the ( , ) make a parenthesis between each item
}


function dealComputerCards() { 
com1Hand = []
com2Hand = []

com1Hand.push(deck.pop())
com1Hand.push(deck.pop())
com2Hand.push(deck.pop())
com2Hand.push(deck.pop())
}


function computersReactToPlayerBet(callAmount) {
if (!com1Folded) { // if the computer folds 
const call1 = Math.random() < 0.7 && com1Wallet >= callAmount; // 
if (call1) {
com1Wallet -= callAmount;
pot += callAmount;
  } 
}
if (!com2Folded) {
const call2 = Math.random() < 0.7 && com2Wallet >= callAmount;
if (call2) {
com2Wallet -= callAmount;
pot += callAmount;
    }
  }
}

function awardPotTo(winner) {
pot = 0;
refreshDisplays();
}


function endHand() {
dealButton.disabled = false
}












