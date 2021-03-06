//start spinner

// On page load calls function to get symbol parameter from url
document.addEventListener("DOMContentLoaded", getSymbol);

// Get symbol parameter from url
// builds url to use with fetch function
// Calls fetch function
function getSymbol() {
  let urlParams = new URLSearchParams(window.location.search);
  symbol = urlParams.get("symbol");
  // company = symbol
  data_source =
    "https://financialmodelingprep.com/api/v3/company/profile/" +
    symbol +
    "?apikey=d57c14ca0b75ea7a7da3ceab36d9970e";
  fetchUserSearch(data_source);
  fetchNewUrl(symbol);
}

// fetch function to get company details
// DOM manipulation to fill HTML elements with required company details.
function fetchUserSearch(url) {
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      const details = data.profile;
      let image = document.getElementById("logo");
      image.src = details.image;
      let name = document.getElementById("name");
      name.innerText = details.companyName;
      let link = document.getElementById("company_link");
      link.href = details.website;
      let sector = document.getElementById("sector");
      sector.innerText = "(" + details.sector + ")";
      let description = document.getElementById("description");
      description.innerText = details.description;
      let stock_price = document.getElementById("stock_price");
      stock_price.innerText = "Stock Price: $" + details.price;
      let changes_percentage = document.getElementById("changes%");
      changes_percentage.innerText = details.changesPercentage;
      let changes = details.changes;
      if (changes < 0) {
        changes_percentage.classList.add("green_light");
      } else {
        changes_percentage.classList.add("red_light");
      }
    });
}

// fetch data and return it
function fetchNewUrl() {
  document.getElementById("Loader").classList.remove("loaded");
  let new_url =
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?` +
    "apikey=d57c14ca0b75ea7a7da3ceab36d9970e";
  fetch(new_url)
    .then((response) => response.json())
    .then((data) => {
      let historical = data.historical;
      let dates = historical.map((company) => company.date);
      xData = dates.slice(Math.max(dates.length - 20, 0));
      let closes = historical.map((company) => company.close);
      yData = closes.slice(Math.max(closes.length - 20, 0));
      drawChart(xData, yData);
    });
}

//Function to draw chart and update with fetched data
function drawChart(xData, yData) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xData,
      datasets: [
        {
          label: "Stock Price History",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(0, 0, 0)",
          data: yData,
        },
      ],
    },
    options: {},
  });
  document.getElementById("Loader").classList.add("loaded");
}
