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

// Skapar kort-objekt
function Card(n, _serverId, _id, _secret){
  this.imageNumber = n;
  this.imageLink = `https://live.staticflickr.com/${_serverId}/${_id}_${_secret}_m.jpg`;
}



let galleryButtons = document.querySelectorAll('.top-container button')




// Function that removes all gallery buttons
 function removeBtn(){
 for (galleryButton of galleryButtons){
   galleryButton.style.display = 'none';
   let btnstart=document.createElement('button');
   let topcontainer=document.querySelector('.top-container')
   topcontainer.appendChild(btnstart);
 }
}

let urlGallery = '';
urlGallery = catGallery;

catButton.addEventListener('click',
  function () {

    this.style.display='none';
    getFlickrImg(catGallery);
    removeBtn();
  }

  

)

horseButton.addEventListener('click',
  function () {
    this.style.display='none';
    getFlickrImg(horseGallery);
    removeBtn();
    
  }
  
)

dogButton.addEventListener('click',
  function () {
    this.style.display='none';
    getFlickrImg(dogGallery);
    removeBtn();
    
  }
)

// Set this to a 
function getFlickrImg(urlGallery){let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${keyAPI}&gallery_id=${urlGallery}&format=json&nojsoncallback=1?secret=${keySecret}`;



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

    let cardDeck = []; //Kortleken.

    for (let i = 0; i<2; i++){ // Lägger in samma bilder två gånger.
      for (let j = 0; j < total; j++){ //Lägger in alla olika bilder i arrayn.
        let id = data.photos.photo[j].id;
        let serverId = data.photos.photo[j].server;
        let secret = data.photos.photo[j].secret;
        
        console.log(id)

        let card = new Card(j, serverId, id, secret);
        cardDeck.push(card);
      }
    }
    cardDeck.sort( (a, b) => 0.5 - Math.random() ); //Blandar kortleken.
    console.log(cardDeck);

    for (let i = 0; i < cardDeck.length; i++){
      let gameWrap = document.querySelector('.game-wrap');
      let memoryCard = document.createElement('aside');
      memoryCard.dataset.num=cardDeck[i].imageNumber;
      memoryCard.classList.add('card', 'card-hidden');
      memoryCard.style.backgroundImage = `url(${cardDeck[i].imageLink})`;
      gameWrap.appendChild(memoryCard);
      console.log(cardDeck[i].imageLink);
      console.log(cardDeck[i].imageNumber)
    };
    console.log(gameWrap);
    console.log(gameWrap.children);

    const card = document.querySelectorAll('aside');
    let hasFlippedCard = false;
    let lockBoard =false;
    let firstCard, secondCard;
    let score =1;
    let tries =1;
    function flipCard() {
      if (lockBoard) return;
      if(this === firstCard) return;
      this.classList='';
      this.classList.add('card');
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        
      }else{
        hasFlippedCard=false;
        secondCard=this;
        
        console.log(firstCard.dataset.num)
        console.log(secondCard.dataset.num)

        if (firstCard.dataset.num === secondCard.dataset.num){
          firstCard.removeEventListener('click', flipCard)
          secondCard.removeEventListener('click', flipCard)
          let scoreh = document.querySelector('.score');
          scoreh.innerHTML=`Score: ${score}`
          score++;
          console.log(score)
          let triesh = document.querySelector('.tries');
          triesh.innerHTML=`Tries: ${tries}`
          tries++;
        }else{
          lockBoard=true;
          setTimeout(function(){
            firstCard.classList.add('card-hidden')
            secondCard.classList.add('card-hidden')
            let triesh = document.querySelector('.tries');
            triesh.innerHTML=`Tries: ${tries}`
            tries++;
            lockBoard=false;
          }, 1000);
        }
      }
    }
    for (let i = 0; i<2; i++){ // Lägger in samma bilder två gånger.
      for (let j = 0; j < total; j++){ //Lägger in alla olika bilder i arrayn.
        let id = data.photos.photo[j].id;
        let serverId = data.photos.photo[j].server;
        let secret = data.photos.photo[j].secret;

        let card = new Card(j, serverId, id, secret);
        cardDeck.push(card);
      }
    }
    
    card.forEach(card => card.addEventListener('click', flipCard));
  }
).catch(
  error => {
    console.log('Fel: ', error);
  }
);
}
