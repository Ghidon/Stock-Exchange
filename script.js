// get all stock price on page load
document.addEventListener("DOMContentLoaded", marqueePrice);

function marqueePrice() {
  let searchTicker =
    "https://financialmodelingprep.com/api/v3/stock/real-time-price";
  fetch(searchTicker)
    .then(response => response.json())
    .then(data => {
      prices = data.stockList;
      let ticker = document.getElementById("ticker"); //element in html
      prices.forEach(element => {
        const symbol = element.symbol;
        const price = element.price;
        let symbolSpan = document.createElement("span");
        symbolSpan.classList.add("blackText");
        let priceSpan = document.createElement("span");
        priceSpan.classList.add("green_light");
        symbolSpan.innerHTML += " - " + symbol + " ";
        priceSpan.innerHTML += "$" + price + " ";
        ticker.appendChild(symbolSpan);
        ticker.appendChild(priceSpan);
      });
    });
}

// event listeners
document.getElementById("button-addon2").addEventListener("click", GetValue);

// global variable
let myDiv = document.getElementById("results");

function GetValue() {
  let inputVal = document.getElementById("myInput").value;
  startLoader();
  myDiv.innerHTML = "";
  searchValue(inputVal);
}

//Builds the query url and calls function to fetch data
async function searchValue(value) {
  let search =
    "https://financialmodelingprep.com/api/v3/search?query=" +
    value +
    "&limit=10&exchange=NASDAQ";
  const fetchedSearch = await fetchSearch(search);
  fetchedSearch.map(company => {
    companyDetails = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
    fetch(companyDetails)
      .then(response => response.json())
      .then(data => {
        company.image = data.profile.image;
        company.percentage = data.profile.changesPercentage;
        company.changes = data.profile.changes;
        let innerDiv = document.createElement("div");
        innerDiv.classList.add("flexible");
        let logo = document.createElement("img");
        logo.src = company.image;
        logo.classList.add("logoSize");
        let line = document.createElement("a");
        innerDiv.classList.add("listStyle");
        line.href = "company.html?symbol=" + company.symbol;
        line.target = "_blank";
        line.innerHTML += company.name;
        let symbol = document.createElement("span");
        symbol.classList.add("symbolColor");
        symbol.innerHTML = " (" + company.symbol + ")";
        let changes = document.createElement("span");
        changes.innerHTML += " " + company.changes;
        if (company.changes < 0) {
          changes.classList.add("green_light");
        } else {
          changes.classList.add("red_light");
        }
        innerDiv.appendChild(logo);
        innerDiv.appendChild(line);
        line.appendChild(symbol);
        line.appendChild(changes);
        myDiv.appendChild(innerDiv);
        stopLoader();
      });
  });
  //console.log(fetchedSearch)
}

// Async function to fetch companies data
async function fetchSearch(url) {
  let companies = [];
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      companies = data;
      return companies;
    });
  return companies;
}

//Stops Loader
function stopLoader() {
  document.getElementById("Loader").classList.add("loaded");
}
//Starts Loader
function startLoader() {
  document.getElementById("Loader").classList.remove("loaded");
}
