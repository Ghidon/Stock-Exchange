// get all stock price on page load
//document.addEventListener("DOMContentLoaded", marqueePrice);

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
  debounce(e => {
    let inputVal = document.getElementById("myInput").value;
    startLoader();
    myDiv.innerHTML = "";
    searchValue(inputVal);
  }, 1000)
);

// global variable
let myDiv = document.getElementById("results");

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
