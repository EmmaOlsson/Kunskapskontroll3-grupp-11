
// Setting the api-key to a variable
const keyAPI = 'ede2a0d6e77e60346537e570cfab9800';

//Setting thhe secret-key to a variable
const keySecret = '1d5f8c611d8e8096?';

// Creating variables for different gallery-id:s
const catGallery = '72157717105466456';
const dogGallery = '72157717117782237';
const horseGallery = '72157717118951277';


// Selects and sets a variable for the gallery-buttons from HTML
let catButton = document.querySelector('#cat-button')
let dogButton = document.querySelector('#dog-button')
let horseButton = document.querySelector('#horse-button')

// Set this to a 
function chooseGallery(){
  return catGallery;
}
catButton.addEventListener('click', chooseGallery);



// If the user clicks on cat, the urlGallery = catGallery
let urlGallery = chooseGallery();

let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${keyAPI}&gallery_id=${urlGallery}&format=json&nojsoncallback=1?secret=${keySecret}`;



fetch(url)
.then(function(response){

  if(response.status >= 200 && response.status <300){
      return response.json();
  }

})
.then(

    function(data){
      console.log(data)

      let randomNum = Math.ceil(Math.random()*12)-1;

      console.log(randomNum)

      let id = data.photos.photo[randomNum].id;
      let serverId = data.photos.photo[randomNum].server;
      let secret = data.photos.photo[randomNum].secret;
      let sizeSuffix = 'm';

      let gameWrap = document.querySelector('.game-wrap')
      let imageUrl = `url(https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg)`;

      for (i = 0; i < 24; i++) {
        let memoryCard = document.createElement('aside')
        gameWrap.appendChild(memoryCard)
        memoryCard.style.backgroundImage = imageUrl;

    }



      console.log(imageUrl);
/* 
      let cit = document.querySelector('aside');
      cit.style.backgroundImage = imageUrl; */


    }
)
