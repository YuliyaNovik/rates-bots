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
    const fixedValue = value.toFixed(decimalPlaces);
    return " ".repeat(width - fixedValue.length) + fixedValue;
}

const formatScale = (scale, width = 6) => {
    if (scale === 1) {
        return " ".repeat(width);
    }

    return " ".repeat(width - scale.toString().length) + scale.toString();
}

module.exports = { createRatesMessage };