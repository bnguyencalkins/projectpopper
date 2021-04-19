function index() {
    box = document.getElementById('indexDiv');
    if (box.classList.contains("d-none")) {
        box.classList.add("d-block");
        box.classList.remove("d-none");
    }
    else {
        box.classList.remove("d-block");
        box.classList.add("d-none");
    }

}

const logLink = 'https://docs.google.com/spreadsheets/d/1Tnnik4Ej7NycIFd-F6RrMjHqBUp3fzXoBRGx2PqEc9E/export?format=csv&grid=0';

let result;
/* Papa Parsing LOG file */
const csvData = Papa.parse(logLink, {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
    qouteChar: '"',
    escapeChar: '"',
    transformHeader: name => {
        switch(name) {
          case 'Timestamp': { return 'Date'; break; }
          case 'What is your name?': { return 'Author'; break; }
          case 'What is the Title of your Project?': { return 'Title'; break; }
          case 'What field of study does your project include? [Choices]': { return 'Field'; break; }
          case 'What\'s a short description of your project?': { return 'Overview'; break; }
          case 'Would you consider your project successful?': { return 'Success'; break; }
          case 'Is there anything you would have done differently? If so, what?': { return 'Changes'; break; }
        }
      },
    complete: function(result) {
        console.log(result);
        data = result.data;
        makeCards(data);
    }
});

function makeCards(data) {
    for (i = 0; i < data.length; i++) {
        // Name all of the variables from the Google Sheet data
        var title = document.createTextNode(data[i].Title);
        var author = document.createTextNode(data[i].Author);
        var date = document.createTextNode(data[i].Date);
        var field = document.createTextNode(data[i].Field);
        var overview = document.createTextNode(data[i].Overview);
        var success = document.createTextNode(data[i].Success);
        var changes = document.createTextNode(data[i].Changes);
        
        // Creates destination- the div ID 'holder for easier reference
        var destination = document.getElementById('holder');


        // Creates a div element, then gives it a class (card)
        var card = document.createElement("DIV");
        card.classList.add("card");
        // Creates card body div, then card-text p
        var cardBody = document.createElement("DIV");
        cardBody.classList.add("card-body");
        // Creates Overview h3, then overview body
        cardBody.innerHTML += '<h3>Overview</h3>';
        p = document.createElement("P");
        p.classList.add("card-text");
        p.appendChild(overview);
        cardBody.appendChild(p);
        // Creates Success? h3, then success and changes answers
        cardBody.innerHTML += "<h3>Was it successful?</h3>";
        cardBody.appendChild(success);
        cardBody.innerHTML += "<br>";
        cardBody.appendChild(changes);
        
        //creates h1 Title
        var h1 = document.createElement("H1");
        h1.appendChild(title);

        //Creates span badge for field
        var badge = document.createElement("SPAN");
        badge.classList.add("badge", "badge-secondary", "d-block");
        badge.appendChild(field);
        
        //creates subtitle above h1
        var subtitle = document.createElement("P");
        subtitle.classList.add("card-subtitle");
        subtitle.appendChild(author);

        // Add everything to card
        card.appendChild(subtitle);
        card.appendChild(h1);
        card.appendChild(date);
        card.appendChild(badge);
        card.appendChild(cardBody);


        // Adds card to destination
        destination.appendChild(card);
        

    }
}
