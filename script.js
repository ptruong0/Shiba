const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

var shibaCount = 10
var base_url = 'http://shibe.online/api/shibes?count=' + shibaCount.toString();

//var request = new XMLHttpRequest();
//request.open('GET', base_url, true);
async function getShibas() {
    await fetch(corsAnywhere + base_url/*, {
        /*method: 'GET',
        headers: {
            'Content-Type': 'application-json'
        },
        mode: 'no-cors',
        credentials: 'include'
    }*/)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(response => {
            if (response.status === 200) {
                console.log('YAY')
            } else {
                console.log('Oh no')
                var h = document.createElement('h1');
                h.appendChild(document.createTextNode('Error :('))
            }
            return response;
        })
        
        .then(jsonData => {
            var button = document.getElementById('start').remove()
            jsonData.forEach((imageUrl) => {
                var image = document.createElement('img');
                image.src = imageUrl;
                image.height = 400;
                image.width = 400;
                console.log(imageUrl)

                var span = document.createElement('div');
                span.setAttribute('class', 'dot');
                span.appendChild(image)

                document.getElementById('gallery').appendChild(span)
            })
            /*
            const errorMsg = document.createElement('marquee');
            errorMsg.textContent = 'Could not connect.';
            */

        })
        .catch(error => console.log(error))
}

function turnOffAudio() {

}