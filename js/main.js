// Setting the api-key to a variable
const keyAPI = 'ede2a0d6e77e60346537e570cfab9800';

//Setting the secret-key to a variable
const keySecret = '1d5f8c611d8e8096?';

// Creating variables for different gallery-id:s
const catGallery = '72157717105466456';
const dogGallery = '72157717117782237';
const horseGallery = '72157717118951277';

// Selects and sets a variable for the gallery-buttons from HTML
let catButton = document.querySelector('#cat-button')
let horseButton = document.querySelector('#horse-button')
let dogButton = document.querySelector('#dog-button')

// Selects elements from HTML
let gameWrap = document.querySelector('.game-wrap');
let galleryButtons = document.querySelectorAll('.top-container button')
let topcontainer = document.querySelector('.top-container')


// Creates a button.element
let newGameBtn = document.createElement('button');

// Creating a card constructor
function Card(_imageNumber, _serverId, _id, _secret){
  this.imageNumber = _imageNumber;
  this.serverId = _serverId;
  this.id = _id;
  this.secret = _secret;
}

// Creating a card prototype
Card.prototype.imageLink = function(){
  return `https://live.staticflickr.com/${this.serverId}/${this.id}_${this.secret}_m.jpg`;
}

console.dir(Card)

// Function that removes all gallery buttons
 function removeBtn(){
 for (galleryButton of galleryButtons){
   galleryButton.style.display = 'none';
 }
}

// Function that appends the 'New Game'-button to top-container and givin the button a text
function addBtn(){
topcontainer.appendChild(newGameBtn);
newGameBtn.innerText  = 'New Game';
}


// Eventlistener for the 'catButton'
catButton.addEventListener('click',
  function () {
    getFlickrImg(catGallery);
    removeBtn();
    addBtn()
  }
)

// Eventlistener for the 'horseButton'
horseButton.addEventListener('click',
  function () {
    getFlickrImg(horseGallery);
    removeBtn();
    addBtn()
  }
)

// Eventlistener for the 'dogButton'
dogButton.addEventListener('click',
  function () {
    getFlickrImg(dogGallery);
    removeBtn();
    addBtn()
  }
)

// // Eventlistener for the 'newGameBtn' that removes the button and reloads the game
newGameBtn.addEventListener('click',
  function(){
    topcontainer.removeChild(newGameBtn);
    location.reload();
  }
)

// Function for selecting the chosen gallery
function getFlickrImg(urlGallery){
  let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${keyAPI}&gallery_id=${urlGallery}&format=json&nojsoncallback=1?secret=${keySecret}`;

// Fetching the data from the selected url
fetch(url)
.then(function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
    // Shows an error alert and throws the error to the error handler
  } else {
    throw 'An error occured'
  }
})
.then(
  function (data) {
    console.log(data)

    // Getting the total number of photos from data
    let total = data.photos.total;

    // Creating array for the memory cards
    let cardDeck = []; 

    // Creating a loop for getting the photos two times
    for (let i = 0; i<2; i++){ 

      //Creating a loop for putting the photos inside the 'cardDeck'-array
      for (let j = 0; j < total; j++){ 

        // Collecting the data from API
        let id = data.photos.photo[j].id;
        let serverId = data.photos.photo[j].server;
        let secret = data.photos.photo[j].secret;
        
        // Creating an instance object for 'Card'
        let card = new Card(j, serverId, id, secret);

        // Pushing the cards to the 'cardDeck'-array
        cardDeck.push(card);


      }
    }
    // Mixing the 'cardDeck' randomly
    cardDeck.sort( (a, b) => 0.5 - Math.random() ); 

    // Creating a loop for creating a memory card for every photo
    for (let i = 0; i < cardDeck.length; i++){
      let memoryCard = document.createElement('aside');
      // 
      memoryCard.dataset.num = cardDeck[i].imageNumber;
      memoryCard.classList.add('card', 'card-hidden');
      memoryCard.style.backgroundImage = `url(${cardDeck[i].imageLink()})`;
      gameWrap.appendChild(memoryCard);
    };

    // 
    const card = document.querySelectorAll('aside');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 1;
    let tries = 1;
    function flipCard() {
      if (lockBoard) return;
      if(this === firstCard) return;
      this.classList = '';
      this.classList.add('card');
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
      }else{
        hasFlippedCard = false;
        secondCard = this;
      

        // 
        if (firstCard.dataset.num === secondCard.dataset.num){
          firstCard.removeEventListener('click', flipCard)
          secondCard.removeEventListener('click', flipCard)
          let scoreh = document.querySelector('.score');
          scoreh.innerHTML = `Pairs found: ${score} / 12`
          score++;
          console.log(score)
          let triesh = document.querySelector('.tries');
          triesh.innerHTML = `Tries: ${tries}`
          tries++;
        } else{
          lockBoard=true;
          setTimeout(function(){
            firstCard.classList.add('card-hidden')
            secondCard.classList.add('card-hidden')
            let triesh = document.querySelector('.tries');
            triesh.innerHTML = `Tries: ${tries}`
            tries++;
            lockBoard=false;
          }, 1000);
        }
      }
      // Shows an alert with numbers of tries, when completing the game 
      if (score === 13) {
        setTimeout(function(){
          alert(`Congratulations! You completed the game with ${tries-1} tries`);
        }, 500);
      }
    }

    
    // 
    card.forEach(card => card.addEventListener('click', flipCard));
  }
  // Catchese the error thrown in the respons function
).catch(
  error => {
    console.log('Fel: ', error);

  }
);
}
