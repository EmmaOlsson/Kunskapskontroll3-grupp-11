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

// Selects 
let gameWrap = document.querySelector('.game-wrap');
let galleryButtons = document.querySelectorAll('.top-container button')
let btnstart = document.createElement('button');
let topcontainer = document.querySelector('.top-container')

// Creating a card constructor
function Card(n, _serverId, _id, _secret){
  this.imageNumber = n;
  
  this.serverId = _serverId;
  this.id = _id;
  this.secret = _secret;
}
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
function addBtn(){

topcontainer.appendChild(btnstart);

btnstart.innerText  = 'New Game';
}

let urlGallery = '';
urlGallery = catGallery;

catButton.addEventListener('click',
  function () {
    this.style.display='none';
    getFlickrImg(catGallery);
    removeBtn();
    addBtn()
  }
)

horseButton.addEventListener('click',
  function () {
    this.style.display='none';
    getFlickrImg(horseGallery);
    removeBtn();
    addBtn()
  }
)

dogButton.addEventListener('click',
  function () {
    this.style.display='none';
    getFlickrImg(dogGallery);
    removeBtn();
    addBtn()
  }
)

btnstart.addEventListener('click',
  function(){
    topcontainer.removeChild(btnstart);
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
  } else {throw 'An error occured'}
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

        //  Pushing the cards to the 'cardDeck'-array
        cardDeck.push(card);
      }
    }
    // Mixing the 'cardDeck' randomly
    cardDeck.sort( (a, b) => 0.5 - Math.random() ); 

    // Creating a loop for creating a memory card for every photo
    for (let i = 0; i < cardDeck.length; i++){
      let gameWrap = document.querySelector('.game-wrap');
      let memoryCard = document.createElement('aside');
      memoryCard.dataset.num = cardDeck[i].imageNumber;
      memoryCard.classList.add('card', 'card-hidden');
      memoryCard.style.backgroundImage = `url(${cardDeck[i].imageLink()})`;
      gameWrap.appendChild(memoryCard);
    };

    // Collecting the card from HTML
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
        hasFlippedCard=false;
        secondCard=this;
        
        console.log(firstCard.dataset.num)
        console.log(secondCard.dataset.num)

        // Matches the cards
        if (firstCard.dataset.num === secondCard.dataset.num){
          firstCard.removeEventListener('click', flipCard)
          secondCard.removeEventListener('click', flipCard)
          let scoreh = document.querySelector('.score');
          scoreh.innerHTML = `Score: ${score}`
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
        alert(`Congratulations! You completed the game with ${tries-1} tries`);
      }
    }

    
    // Adds an event
    card.forEach(card => card.addEventListener('click', flipCard));
  }
).catch(
  error => {
    console.log('Fel: ', error);

  }
);
}
