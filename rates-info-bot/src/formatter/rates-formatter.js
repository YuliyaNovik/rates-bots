const createRatesMessage = (rates, defaultCurrency, textFormatter) => {
    let response = "";

    for (const rate of rates) {
        response += textFormatter.getCode(defaultCurrency + " to "
            + formatScale(rate.currency.scale) + " "
            + rate.currency.abbreviation + " "
            + numberToFixedColumnWidth(rate.rate.officialRate)) + "\n";
    }

    return response;
}

const numberToFixedColumnWidth = (value, decimalPlaces = 4, width = 8) => {
    return value.toFixed(decimalPlaces).padStart(width, " ");
}

const formatScale = (scale, width = 6) => {
    if (scale === 1) {
        return " ".repeat(width);
    }

    return scale.toString().padStart(width, " ");
}

module.exports = { createRatesMessage };