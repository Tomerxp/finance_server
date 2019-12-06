const axios = require('axios')
const positionsData = require('../data/positions')
const finUnitsData = require('../data/financial_units')

const mainCurrency = 'USD'

exports.getPositions = (req, res) => res.json(positionsData)

exports.getFinance = async (req, res) => {
  const finUnits = {}

  finUnitsData.forEach(unit => {
    finUnits[unit.id] = {
      finUnitName: unit.name,
      notionalValues: [],
      currencies: [],
    }
  })

  positionsData.forEach(position => {
    const finUnit = finUnits[position.fuOriginId]
    if (finUnit) {
      finUnits[position.fuOriginId] = {
        ...finUnit,
        notionalValues: [
          ...finUnit.notionalValues,
          position.data.currency.notionalValue,
        ],
        currencies: [...finUnit.currencies, position.data.currency.ccy],
      }
    }
  })

  // Setting delay to simulate loading
  setTimeout(() => res.json(finUnits), 2000)
}

exports.getRates = async (req, res) => {
  const rates = await fetchRates(mainCurrency)

  res.json(rates)
}

const fetchRates = async baseCurrency => {
  const response = await axios.get(
    `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`,
  )
  const { rates } = response.data

  // Returned rates are 'How much baseCurrency worth in each currency?'
  // We want to know how much each currency is worth in baseCurrency,
  // So we will divide 1 by each rate
  const currencyToBaseCurrency = {}

  Object.keys(rates).forEach(rate => {
    currencyToBaseCurrency[rate] = 1 / rates[rate]
  })

  return currencyToBaseCurrency
}
