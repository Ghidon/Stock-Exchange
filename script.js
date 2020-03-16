<<<<<<< HEAD


document.getElementById("button-addon2").addEventListener("click", GetValue);
let myDiv = document.getElementById("results");

function GetValue() {
    let inputVal = document.getElementById("myInput").value;
    startLoader()
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
                stopLoader()
            }
        })
}

//Stops Loader
function stopLoader() {
    document.getElementById("Loader").classList.add('loaded');
}
//Starts Loader
function startLoader() {
    document.getElementById("Loader").classList.remove('loaded');
}

=======
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

>>>>>>> 2ac6b3bd0dac6a6ef69429ff4a69a983e46a25d4
