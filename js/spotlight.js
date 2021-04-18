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
        var title = data[i].Title;
        var author = data[i].Author;
        var date = data[i].Date;
        var field = data[i].Field;
        var overview = data[i].Overview;
        var success = data[i].Success;
        var changes = data[i].Changes;


        document.getElementById('holder').innerHTML = title + '<br>' + overview;
    }
}

