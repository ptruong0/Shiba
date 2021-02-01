// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
// var jokeAmount = 5;
// baseUrl += "?amount=" + jokeAmount.toString();

function constructUrl() {
    var form = document.getElementById("initial-form");
    jokeAmount = form.numJokes.value;
    
    var baseUrl = 'https://sv443.net/jokeapi/v2/joke/Any'
    baseUrl += "?amount=" + jokeAmount.toString(); console.log(jokeAmount);
    return baseUrl;
}


async function getJokes() {
    await fetch(constructUrl()
    )
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(response => {
            if (!response["error"]) {
                console.log('success');
            }
            else {
                console.log('failure');
            }
            return response
        })
        .then(jsonData => {
            // clear old jokes before getting new ones
            document.getElementById('jokebody').innerHTML = "";

            var index = 1;
            console.log(jokeAmount);
            if (parseInt(jokeAmount) === 1) {
                addJoke(jsonData, 1, 0)
            }
            else {
                jsonData["jokes"].forEach((joke) => {
                    addJoke(joke, index)
                    index++;
                })
            }
        })
}

function addJoke(joke, index) {
    console.log("joke");
    if (joke["type"] === "twopart") {
        var setup = document.createElement('p');
        setup.setAttribute("class", "setup");
        setup.innerHTML = index + ") " + joke["setup"];

        var delivery = document.createElement('p');
        delivery.setAttribute("class", "delivery");
        delivery.setAttribute("id", index);
        delivery.innerHTML = joke["delivery"];
        delivery.style.display = "none";

        var showButton = document.createElement('button');
        showButton.setAttribute('class', 'show');
        showButton.addEventListener("click", function() {
            togglePunchline(index);
        });
        showButton.innerHTML = 'Reveal';

        var span = document.createElement('div');
        span.setAttribute('class', 'twopartjoke')
        span.appendChild(setup);
        span.appendChild(showButton);
        span.appendChild(delivery);

        document.getElementById("jokebody").appendChild(span);

    } else {
        var single = document.createElement('p');
        single.setAttribute("class", "singlejoke");
        single.innerHTML = index + ") " + joke["joke"];

        document.getElementById("jokebody").appendChild(single);
        
    }
    document.createElement('p');
}

function togglePunchline(index) {
    console.log(index);
    var punchline = document.getElementById(index);
    if (punchline.style.display === "none") {
        punchline.style.display = "block";
    } else {
        punchline.style.display = "none";
    }
}