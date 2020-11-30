const url = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ede2a0d6e77e60346537e570cfab9800&gallery_id=72157716940730018&format=json&nojsoncallback=1'

fetch(url).then(
    response => {return response.json();}
).then(
    function(data){
        const img = document.querySelector()
        console.log(data)

    }
)