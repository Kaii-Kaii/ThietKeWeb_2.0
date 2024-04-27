function loadContent(pageName, elementID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(elementID).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", pageName + ".html", true);
    xhttp.send();
}