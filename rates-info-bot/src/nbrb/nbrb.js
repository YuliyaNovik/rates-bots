const { get } = require("../http/request");
const { convertDate } = require("./date");

const getCurrency = async (id) => {
    const data = await get(`https://www.nbrb.by/api/exrates/currencies/${id}`);
    return currencyMapper(data);
}

const getRatesOnDate = async (date) => {
    const data = await get(`https://www.nbrb.by/api/exrates/rates?ondate=${convertDate(date)}&periodicity=0`);
    return data.map(rateMapper);
}

const getCurrenciesOnDate = async (date) => {
    const ratesOnDate = await getRatesOnDate(date);

    return (await Promise.allSettled(
        ratesOnDate.map((rate) => new Promise( (resolve, reject) => {
                getCurrency(rate.id)
                    .then((currency) => resolve({
                        rate,
                        currency
                    }))
                    .catch(reject);
            }))
        ))
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value);
}

const rateMapper = (rate) => {
    return {
        id: rate.Cur_ID,
        date: new Date(Date.parse(rate.Date)),
        officialRate: rate.Cur_OfficialRate
    };
}

const currencyMapper = (currency) => {
    const startDate = new Date(Date.parse(currency.Cur_DateStart));
    const endDate = new Date(Date.parse(currency.Cur_DateEnd));

    return {
        id: currency.Cur_ID,
        parentId: currency.Cur_ParentID,
        code: currency.Cur_Code,
        abbreviation: currency.Cur_Abbreviation,
        scale: currency.Cur_Scale,
        startDate: startDate,
        endDate: endDate
    };
}

module.exports = { getRatesOnDate, getCurrenciesOnDate }
