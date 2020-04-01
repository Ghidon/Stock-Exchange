class FormSearch {
  constructor(element) {
    this.element = element;
    this.event();
  }

  debounce = (fn, delay) => {
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

  ResultParent() {
    let myDiv = document.getElementById("results");
    return myDiv;
  }

  event() {
    this.element.addEventListener(
      "keydown",
      this.debounce(e => {
        let inputVal = this.element.value;
        this.startLoader();
        let myDiv = this.ResultParent();
        myDiv.innerHTML = "";
        this.searchValue(inputVal);
      }, 1000)
    );
  }

  //Builds the query url and calls function to fetch data
  async searchValue(value) {
    let search = `https://financialmodelingprep.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ`;
    const fetchedSearch = await this.fetchSearch(search);
    fetchedSearch.map(company => {
      let companyDetails = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
      fetch(companyDetails)
        .then(response => response.json())
        .then(newData => {
          new CompanyListElement(
            company,
            newData,
            this.element.value,
            this.ResultParent()
          );
        });
      this.stopLoader();
    });
  }

  // Async function to fetch companies data
  async fetchSearch(url) {
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
  stopLoader() {
    document.getElementById("Loader").classList.add("loaded");
  }
  //Starts Loader
  startLoader() {
    document.getElementById("Loader").classList.remove("loaded");
  }
}

new FormSearch(document.getElementById("myInput"));
