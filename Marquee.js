class Marquee {
  constructor(element) {
    this.element = element;
  }

  marqueePrice() {
    let searchTicker =
      "https://financialmodelingprep.com/api/v3/stock/real-time-price";
    fetch(searchTicker)
      .then(response => response.json())
      .then(data => {
        let prices = data.stockList;
        prices.forEach(element => {
          const symbol = element.symbol;
          const price = element.price;
          let symbolSpan = document.createElement("span");
          symbolSpan.classList.add("blackText");
          let priceSpan = document.createElement("span");
          priceSpan.classList.add("green_light");
          symbolSpan.innerHTML += " - " + symbol + " ";
          priceSpan.innerHTML += "$" + price + " ";
          this.element.appendChild(symbolSpan);
          this.element.appendChild(priceSpan);
        });
      });
  }
}

let marqueeInstance = new Marquee(document.getElementById("ticker"));
marqueeInstance.marqueePrice();
