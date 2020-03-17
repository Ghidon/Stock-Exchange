// On page load calls function to get symbol parameter from url
document.addEventListener("DOMContentLoaded", getSymbol)

function getSymbol() {
    let urlParams = new URLSearchParams(window.location.search);
    symbol = urlParams.get('symbol')
    data_source = "https://financialmodelingprep.com/api/v3/company/profile/" + symbol
    console.log(data_source)
    fetch_data(data_source)
}

function fetch_data(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            const details = data.profile
            let image = document.getElementById("logo")
            image.src = details.image
            let name = document.getElementById("name")
            name.innerText = details.companyName
            let link = document.getElementById("company_link")
            link.href = details.website
            let sector = document.getElementById("sector")
            sector.innerText = "(" + details.sector + ")"
            let description = document.getElementById("description")
            description.innerText = details.description
            let stock_price = document.getElementById("stock_price")
            stock_price.innerText = "Stock Price: $" + details.price
            let changes_percentage = document.getElementById("changes%")
            changes_percentage.innerText = details.changesPercentage
            let changes = details.changes
            console.log(changes)
            if (changes < 0) {
                changes_percentage.classList.add("green_light");
            } else {
                changes_percentage.classList.add("red_light");
            }
        })
}