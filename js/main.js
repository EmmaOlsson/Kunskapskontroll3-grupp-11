fetch('https://www.flickr.com/services/rest/?api_key=ede2a0d6e77e60346537e570cfab9800&method=flickr.photos.search&text=soda&format=json&nojsoncallback=1')
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
