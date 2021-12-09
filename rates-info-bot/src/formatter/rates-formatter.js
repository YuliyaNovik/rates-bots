const createRatesMessage = (rates, defaultCurrency, textFormatter) => {
    return rates.reduce((acc, rate) => acc + createRatesMessageRow(rate, defaultCurrency, textFormatter), "");
}

const createRatesMessageRow = (rate, defaultCurrency, textFormatter) => {
    const scale = formatScale(rate.currency.scale);
    const abbreviation = rate.currency.abbreviation;
    const officialRate = numberToFixedColumnWidth(rate.rate.officialRate);

    return textFormatter.getCode(`${defaultCurrency} to ${scale} ${abbreviation} ${officialRate}\n`);
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