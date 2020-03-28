class CompanyListElement {
  constructor(company, additionalData, input, parent) {
    this.company = company;
    this.additionalData = additionalData;
    this.input = input;
    this.parent = parent;
    this.appendCompany();
  }
  appendCompany() {
    let stockImage = this.additionalData.profile.image;
    let stockPercentage = this.additionalData.profile.changesPercentage;
    let stockChanges = this.additionalData.profile.changes;
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("listStyle");
    let logo = document.createElement("img");
    logo.src = stockImage;
    logo.classList.add("logoSize");
    let line = document.createElement("a");
    line.href = "company.html?symbol=" + this.company.symbol;
    line.target = "_blank";
    line.innerText += this.company.name;
    let symbol = document.createElement("span");
    symbol.classList.add("symbolColor");
    symbol.innerText = " (" + this.company.symbol + ")";
    let percentages = document.createElement("span");
    percentages.innerText += " " + stockPercentage;
    this.checkStockSign(stockChanges, percentages);
    innerDiv.appendChild(logo);
    //innerDiv.appendChild(line);
    line.appendChild(symbol);
    line.innerHTML = this.Highlight(this.input, line.innerHTML);
    line.appendChild(percentages);
    innerDiv.appendChild(line);
    this.parent.appendChild(innerDiv);
  }

  checkStockSign(stockChanges, element) {
    return stockChanges < 0
      ? element.classList.add("green_light")
      : element.classList.add("red_light");
  }

  Highlight(input, text) {
    const newText = text.replace(
      new RegExp(input, "gi"),
      match => `<mark>${match}</mark>`
    );
    return newText;
    //look inside line.innerText for something that looks like this input
    //create a tag around what you find
    //Assign a CSS class to that tag
  }
}
