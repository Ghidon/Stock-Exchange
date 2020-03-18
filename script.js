
//call function on click
document.getElementById("button-addon2").addEventListener("click", GetValue);

//define myDiv as global variable
let myDiv = document.getElementById("results");

//function to get value from input bar
//start loader
//Clean myDiv of previous results
//call function value_search
function GetValue() {
    let inputVal = document.getElementById("myInput").value;
    startLoader()
    myDiv.innerHTML = ""
    value_search(inputVal)
}

//Builds the query url and calls function to fetch data
function value_search(value) {
    let search = "https://financialmodelingprep.com/api/v3/search?query=" + value + "&limit=10&exchange=NASDAQ"
    fetch_search(search)
}

//Function to fetch data from url
//Runs loop to create an additional element for each result of the search
//Results are links to company.html file each with its own specific symbol
function fetch_search(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                let line = document.createElement("a")
                line.classList.add("listStyle");
                line.href = "company.html?symbol=" + data[i].symbol;
                line.target = "_blank"
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

