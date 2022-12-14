const cardsArray = [{
    'name': 'AVAX',
    'img': 'img/AVAX.jpg',
  },
  {
    'name': 'BAT',
    'img': 'img/BAT.jpg',
  },
  {
    'name': 'BNB',
    'img': 'img/BNB.jpg',
  },
  {
    'name': 'BTC',
    'img': 'img/BTC.jpg',
  },
  {
    'name': 'DOT',
    'img': 'img/DOT.jpg',
  },
  {
    'name': 'ETH',
    'img': 'img/ETH.jpg',
  },
  {
    'name': 'HBAR',
    'img': 'img/HBAR.jpg',
  },
  {
    'name': 'HNT',
    'img': 'img/HNT.jpg',
  },
  {
    'name': 'MATIC',
    'img': 'img/MATIC.jpg',
  },
  {
    'name': 'SOL',
    'img': 'img/SOL.jpg',
  },
  {
    'name': 'USDT',
    'img': 'img/USDT.jpg',
  },
  {
    'name': 'XLM',
    'img': 'img/XLM.jpg',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

let totalCount = 0;
let totalMatched = 0;



const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
      totalCount++;
      console.log(totalCount);
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        totalMatched++;
        console.log(totalMatched);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

  if (totalMatched === 12) {
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById("attempts").innerHTML = totalCount;

    //document.getElementById("restartButton").addEventListener("click", restartGame);
    //  function restartGame() {
    //  return gameGrid;
    //}
  }

});


  
