


fetch('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ede2a0d6e77e60346537e570cfab9800&gallery_id=50619632627&format=json&nojsoncallback=1?secret=1d5f8c611d8e8096')
      .then(function(response){
  
        if(response.status >= 200 && response.status <300){
            return response.json();
        }

      })
      .then(
    
          function(data){

            let cit =document.querySelector('aside');
            cit.style.backgroundImage=`url('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ede2a0d6e77e60346537e570cfab9800&gallery_id=50619632627&format=json&nojsoncallback=1?secret=1d5f8c611d8e8096')`;

          }
      )
    
        
