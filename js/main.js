
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
let dogButton = document.querySelector('#dog-button')
let horseButton = document.querySelector('#horse-button')

// Skapar kort-objekt
function Card(n, _serverId, _id, _secret){
  this.imageNumber = n;
  this.imageLink = `https://live.staticflickr.com/${_serverId}/${_id}_${_secret}_m.jpg`
}

// Set this to a 
function chooseGallery() {
  return catGallery;
}

catButton.addEventListener('click', chooseGallery);

// If the user clicks on cat, the urlGallery = catGallery
let urlGallery = chooseGallery();

let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${keyAPI}&gallery_id=${urlGallery}&format=json&nojsoncallback=1?secret=${keySecret}`;


fetch(url)
  .then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
  })
  .then(
    function (data) {
      console.log(data)

      let total = data.photos.total;

      let sizeSuffix = 'm';

      let gameWrap = document.querySelector('.game-wrap');
      // let imageUrl = `url(https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg)`;

      let cardDeck = [];

      for (let i = 0; i<2; i++){ // Lägger in samma bilder två gånger.
        for (let j = 0; j < total; j++){ //Lägger in alla olika bilder i arrayn.
          let id = data.photos.photo[j].id;
          let serverId = data.photos.photo[j].server;
          let secret = data.photos.photo[j].secret;

          let card = new Card(j, serverId, id, secret);
          cardDeck.push(card);
        }
      }
      console.log(cardDeck);
      cardDeck.sort( (a, b) => 0.5 - Math.random() ); //Blandar kortleken.
      console.log(cardDeck);

      for (let i = 0; i < cardDeck.length; i++){
        let gameWrap = document.querySelector('.game-wrap');
        let memoryCard = document.createElement('aside');
        memoryCard.style.backgroundImage = `url(${cardDeck[i].imageLink})`;
        gameWrap.appendChild(memoryCard);
        console.log(cardDeck[i].imageLink)
      }
      /* for (let i = 0; i < total; i++) {

        let randomNum = Math.floor(Math.random() * 12);

        let id = data.photos.photo[i].id;
        let serverId = data.photos.photo[i].server;
        let secret = data.photos.photo[i].secret;

        let sizeSuffix = 'm';

        let gameWrap = document.querySelector('.game-wrap');
        let imageUrl = `url(https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg)`;



        for (j = 0; j < 2; j++) {
          let memoryCard = document.createElement('aside');
          gameWrap.appendChild(memoryCard);
          memoryCard.style.backgroundImage = imageUrl;
          console.log(id)
        }
      } */
      
      /* 
      let cit = document.querySelector('aside');
      cit.style.backgroundImage = imageUrl; 
      */
    }
  )
