
/* sets up link to Google Sheet file */
const logLink = 'https://docs.google.com/spreadsheets/d/1Tnnik4Ej7NycIFd-F6RrMjHqBUp3fzXoBRGx2PqEc9E/export?format=csv&grid=0';

/* Sets global variable result- a copy of Google Sheets data */
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
          case 'What field of study does your project prioritize?': { return 'Field'; break; }
          case 'What\'s a short description of your project?': { return 'Overview'; break; }
          case 'Is there anything you would have done differently? If so, what?': { return 'Changes'; break; }
          case 'Approved': {return 'Approved'; break}
          case 'How is this project related to Technical Communication?': {return 'Related'; break;}
          case 'Please provide a short outline of your process to create your project': {return 'Outline'; break;}
          case 'Provide a link to your project, if you\'d like.': {return 'Link'; break;}
          case 'What genre is your project?': {return 'Genre'; break; } 
          case 'What class was this project for?': {return 'Class'; break; }
        }
      },
    complete: function(result) {
        console.log("finished:", result.data);
        result.data.filter(f => {
            return f.approved === 'TRUE';
        });
        var data = result.data;

        makeCards(data);
    }
});

/* Starts to make cards from all entries on the Sheet */
function makeCards(data) {
  
    for (i = 0; i < data.length; i++) {

        // Name all of the variables from the Google Sheet data
        var title = document.createTextNode(data[i].Title);
        var author = document.createTextNode(data[i].Author);
        var date = document.createTextNode(data[i].Date);
        var field = document.createTextNode(data[i].Field);
          var fieldClass = data[i].Field.split(" ").join("");
        var overview = document.createTextNode(data[i].Overview);
        var changes = document.createTextNode(data[i].Changes);
        var approval = document.createTextNode(data[i].Approved);
        var related = document.createTextNode(data[i].Related);
        var outline = document.createTextNode(data[i].Outline);
        var link = document.createTextNode(data[i].Link);
        var genre = document.createTextNode(data[i].Genre)
          var genreClass = data[i].Genre.split(" ").join("");
        // Moderation enabled: requires true approved status
        
        // Creates destination- the div ID 'holder for easier reference
        var destination = document.getElementById('holder');

        // updates array count on page, id = count
        var count = document.getElementById("count");
        count.innerHTML = "There are " + data.length + " projects in the TC Popper archives.";

        // Creates a div element, then gives it a class (card)
        var card = document.createElement("DIV");
        card.classList.add("card", "filterDiv", "show");

        // Creates card body div, then card-text p
        var cardBody = document.createElement("DIV");
        cardBody.classList.add("card-body");

        // Creates Overview h3, then overview text
        cardBody.innerHTML += '<h3>Overview</h3>';
        p = document.createElement("P");
        p.classList.add("card-text");
        p.appendChild(overview);
        cardBody.appendChild(p);

        // Creates outline
        cardBody.innerHTML += '<h3>Outline</h3>';
        var outlineP = document.createElement("P");
        outlineP.classList.add("card-text");
        outlineP.appendChild(outline);
        cardBody.appendChild(outlineP);

        // Creates Related elaboration
        cardBody.innerHTML += '<h3>How is this related to Technical Communication?</h3>';
        var outlineRelated = document.createElement("P");
        outlineRelated.classList.add("card-text");
        outlineRelated.appendChild(related);
        cardBody.appendChild(outlineRelated);

        // Creates Success? h3, then success and changes answers
        cardBody.innerHTML += "<h3>Would you have done anything differently?</h3>";
        var changesP = document.createElement("P");
        changesP.classList.add("card-text")
        changesP.appendChild(changes);
        cardBody.appendChild(changesP);
        
        //Creates span badge, secondary, for field
        var badge = document.createElement("SPAN");
        badge.classList.add("badge", "badge-secondary", "d-inline");
        badge.appendChild(field);

        //creates span badge, primary, for genre
        var genreBadge = document.createElement("SPAN");
        genreBadge.classList.add("badge", "d-inline", "badge-primary");
        genreBadge.appendChild(genre);

        //creates h1 Title
        var h1 = document.createElement("H1");
        h1.appendChild(title);
        
        //creates subtitle above h1
        var subtitle = document.createElement("H3");
        subtitle.classList.add("card-subtitle");
        subtitle.appendChild(author);

        // creates card-footer (for date and link)
        var cardFooter = document.createElement("DIV");
        cardFooter.classList.add("card-footer");
        cardFooter.innerHTML = "Submitted: ";
        cardFooter.appendChild(date);

        // // Create text node and link
        // if (link.length > 3) {
        //   var linkA = document.createElement("A");
        //   var linkNode = document.createTextNode("Link to project (external)");
        //   linkA.appendChild(linkNode);
        //   linkA.title = "Project link";
        //   linkA.href = link;
        //   cardFooter.appendChild(linkA);
        // }

        // Add everything to card
        card.appendChild(h1);
        card.appendChild(subtitle);
        card.appendChild(badge);
        card.appendChild(genreBadge);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
       card.classList.add(fieldClass); // Add field class to card to be able to sort easier
       card.classList.add(genreClass);

        // Adds card to destination
        destination.appendChild(card);
    }
}

// Removes class to hide with filter
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }
  
  // Show filtered elements by adding class
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Add active class to the current control button (highlight it)
var filterContainer = document.getElementById("filters");
var btns = filterContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}