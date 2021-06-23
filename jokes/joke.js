// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
// var jokeAmount = 5;
// baseUrl += "?amount=" + jokeAmount.toString();

const baseUrl = 'https://sv443.net/jokeapi/v2/joke/Any';

function constructUrl() {
    let form = document.getElementById("initial-form");
    jokeAmount = form.numJokes.value; // get input number of jokes

    // append joke amount parameter to url
    let url = baseUrl + "?amount=" + jokeAmount.toString();
    console.log(jokeAmount);
    return url;
}


async function getJokes() {
    // fetch from API using URL
    await fetch(constructUrl())
        // convert response to JS json object
        .then(response => {
            console.log(response);
            return response.json();
        })
        // make sure response succeeded
        .then(response => {
            if (!response["error"]) {
                console.log('success');
            } else {
                console.log('failure');
                return null;
            }
            return response;
        })
        .then(jsonData => {
            // clear old jokes before getting new ones
            if (jsonData) {
                document.getElementById('jokebody').innerHTML = "";

                var index = 1;
                console.log(jokeAmount);
                // single joke to display
                if (parseInt(jokeAmount) === 1) {
                    addJoke(jsonData, 1)
                }
                // multiple jokes
                else {
                    // render each joke on the page with a unique index
                    jsonData["jokes"].forEach((joke) => {
                        addJoke(joke, index)
                        index++;
                    })
                }
            }

        })
        .catch(err => console.log(err));
}

function addJoke(joke, index) {
    // joke has a setup and punchline
    if (joke["type"] === "twopart") {
        // put setup in p element
        var setup = document.createElement('p');
        setup.setAttribute("class", "setup");
        setup.innerHTML = index + ") " + joke["setup"];

        // put delivery in p element
        var delivery = document.createElement('p');
        delivery.setAttribute("class", "delivery");
        delivery.setAttribute("id", 'joke-' + index);
        delivery.innerHTML = joke["delivery"];
        delivery.style.display = "none"; // hide delivery initially

        // button to reveal punchline
        var showButton = document.createElement('button');
        showButton.setAttribute('class', 'show');
        showButton.setAttribute('id', 'show-' + index);
        showButton.addEventListener("click", function() {
            togglePunchline(index);
        });
        showButton.innerHTML = 'Reveal';

        // wrap in div container
        var span = document.createElement('div');
        span.setAttribute('class', 'twopartjoke')
        span.appendChild(setup);
        span.appendChild(showButton);
        span.appendChild(delivery);

        // add to document
        document.getElementById("jokebody").appendChild(span);

    }
    // joke only has a punchline
    else {
        // put punchline in p element
        var single = document.createElement('p');
        single.setAttribute("class", "singlejoke");
        single.innerHTML = index + ") " + joke["joke"];

        // add to document
        document.getElementById("jokebody").appendChild(single);

    }
}

function togglePunchline(index) {
    console.log(index);
    // Hide or display the punchline of the joke
    var punchline = document.getElementById('joke-' + index);
    if (punchline.style.display === "none") {
        punchline.style.display = "block";
    } else {
        punchline.style.display = "none";
    }
    // Switch text of 'Reveal' button to 'Hide', or vice versa
    var revealBtn = document.getElementById('show-' + index);
    if (revealBtn.innerHTML === "Reveal") {
        revealBtn.innerHTML = "Hide";
    } else {
        revealBtn.innerHTML = "Reveal";
    }
}