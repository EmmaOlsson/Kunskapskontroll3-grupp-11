


fetch('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ede2a0d6e77e60346537e570cfab9800&gallery_id=72157717105466456&format=json&nojsoncallback=1?secret=1d5f8c611d8e8096?')
.then(function(response){

  if(response.status >= 200 && response.status <300){
      return response.json();
  }

})
.then(

    function(data){
      console.log(data)

      let id = data.photos.photo[0].id;
      let serverId = data.photos.photo[0].server;
      let secret = data.photos.photo[0].secret;
      let sizeSuffix = 'm';

      let imageUrl = `url(https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg)`;

      console.log(imageUrl);

      let cit =document.querySelector('aside');
      cit.style.backgroundImage = imageUrl;
      



    }
)
