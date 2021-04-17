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

var placeholdingarray = {

}

for (var i = 1; i < 10; i++) {
    var projectCol = document.createElement("div");
    var current = document.createTextNode(i);
    projectCol.classList.add("col-md-4", "col-xs-6");

/*Create the card within the column, later to be added to the column */
    var projectCard = document.createElement("button");

    projectCard.classList.add("card", "button", "placeholder");
    projectCol.appendChild(projectCard);
    document.getElementById("holder").appendChild(projectCol);
}