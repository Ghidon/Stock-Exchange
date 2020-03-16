document.getElementById("button-addon2").addEventListener("click", GetValue);
let myDiv = document.getElementById("results");

function GetValue() {
    let inputVal = document.getElementById("myInput").value;
    myDiv.innerHTML = ""
    value_search(inputVal)
}

function value_search(value) {
    let search = "https://financialmodelingprep.com/api/v3/search?query=" + value + "&limit=10&exchange=NASDAQ"
    fetch_search(search)
}

function fetch_search(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                let line = document.createElement("a")
                line.classList.add("listStyle");
                line.href = "/company.html?symbol=" + data[i].symbol;
                line.innerHTML += data[i].name + " (" + data[i].symbol + ")"
                myDiv.appendChild(line)
            }
        })
}

