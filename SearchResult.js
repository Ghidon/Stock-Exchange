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
}
