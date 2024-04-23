function loadContent(pageName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainContent").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "HTML/" + pageName + ".html", true); 
    xhttp.send();
}