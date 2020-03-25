// get all stock price on page load
//document.addEventListener("DOMContentLoaded", marqueePrice);

//now unused
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

//debounce function
const debounce = (fn, delay) => {
  let timeoutID;
  return function(args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(args);
    }, delay);
  };
};

// event listeners
document.getElementById("myInput").addEventListener(
  "keydown",
  debounce(GetValue => {
    let inputVal = document.getElementById("myInput").value;
    startLoader();
    myDiv.innerHTML = "";
    searchValue(inputVal);
  }, 1000)
);

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
      .then(newData => {
        new CompanyListElement(company, newData, myDiv);
      });
    stopLoader();
  });
}

class CompanyListElement {
  constructor(company, additionalData, parent) {
    this.company = company;
    this.additionalData = additionalData;
    this.parent = parent;
    this.appendCompany();
  }
  appendCompany() {
    let stockImage = this.additionalData.profile.image;
    let stockPercentage = this.additionalData.profile.changesPercentage;
    let stockChanges = this.additionalData.profile.changes;
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("flexible");
    let logo = document.createElement("img");
    logo.src = stockImage;
    logo.classList.add("logoSize");
    let line = document.createElement("a");
    innerDiv.classList.add("listStyle");
    line.href = "company.html?symbol=" + this.company.symbol;
    line.target = "_blank";
    line.innerHTML += this.company.name;
    let symbol = document.createElement("span");
    symbol.classList.add("symbolColor");
    symbol.innerHTML = " (" + this.company.symbol + ")";
    let percentages = document.createElement("span");
    percentages.innerHTML += " " + stockPercentage;
    this.checkStockSign(stockChanges, percentages);
    innerDiv.appendChild(logo);
    innerDiv.appendChild(line);
    line.appendChild(symbol);
    line.appendChild(percentages);
    this.parent.appendChild(innerDiv);
  }

  checkStockSign(stockChanges, element) {
    return stockChanges < 0
      ? element.classList.add("green_light")
      : element.classList.add("red_light");
  }

  //remind question about loops
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
