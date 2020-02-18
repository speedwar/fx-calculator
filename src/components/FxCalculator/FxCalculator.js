import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { currencyActions } from 'rx/actions'
import { Input, Fade } from 'reactstrap'
import { formatCurrency, isNumeric } from 'utils'

const FxCalculator = ({ currencyRates, currencyStore, currencyTDP, dispatch }) => {
  const
    [ baseCurrencyAmount, setBaseCurrencyAmount ] = useState('0'),
    [ baseCurrency, setBaseCurrency ] = useState('AUD'),
    [ termCurrency, setTermCurrency ] = useState('USD'),
    [ result, setResult ] = useState(''),
    [ hasError, setHasError ] = useState(false)

  // load currency rates onLoad
  useEffect(() => {
    dispatch(currencyActions.getCurrency())
  }, [])

  const handleInputChange = (e) => {
    const target = e.target,
      value = target.value,
      name = target.name

    switch(name) {
      case 'baseCurrencyAmount':
        setBaseCurrencyAmount(value)
        break
      case 'baseCurrency':
        const hasTDP = (currencyTDP.find(currency => currency === value))
        if (hasTDP) {
          setBaseCurrencyAmount(formatCurrency(baseCurrencyAmount, 2))
        }
        setBaseCurrency(value)
        break
      case 'termCurrency':
        setTermCurrency(value)
        break
      default:
        break
    }
  }

  const handleInputAmountBlur = (e) => {
    const target = e.target,
      value = target.value,
      hasTDP = (currencyTDP.find(currency => currency === baseCurrency))
    let formatInputValue

    if (hasTDP) {
      formatInputValue = formatCurrency(value, 2)
    } else {
      formatInputValue = value
    }

    if (isNumeric(value)) {
      setBaseCurrencyAmount(formatInputValue)
    }
  }

  const handleInputFocus = () => {
    if (hasError) {
      setHasError(false)
    }
  }

  const currencyCalculateEvent = (e) => {
    e.preventDefault() // prevents page refresh

    dispatch(currencyActions.storeCurrency({
      baseCurrencyAmount: baseCurrencyAmount,
      baseCurrency: baseCurrency,
      termCurrency: termCurrency,
    }))

    const [ selectedCurrency ] = currencyRates.data.filter(curr => curr.base === baseCurrency),
      rates = new Map(Object.entries(selectedCurrency.rates)),
      getRate = rates.get(termCurrency),
      getUSDRate = rates.get('USD'),
      getEURRate = rates.get('EUR'),
      hasTDP = (currencyTDP.find(currency => currency === termCurrency))

    let crossRate,
      outcome,
      formatFormat

    switch(getRate) {
      case 'Inv':
        const [ invCurrency ] = currencyRates.data.filter(curr => curr.base === termCurrency)
        const ratesInv = new Map(Object.entries(invCurrency.rates))
        const getInvRate = ratesInv.get(baseCurrency)

        outcome = baseCurrencyAmount / getInvRate
        break
      case '1:1':
        outcome = baseCurrencyAmount
        break
      case 'USD':
        const [currencyUSD] = currencyRates.data.filter(curr => curr.base === 'USD'),
          ratesUSD = new Map(Object.entries(currencyUSD.rates)),
          rateUSD = ratesUSD.get(termCurrency)

        crossRate = baseCurrencyAmount * getUSDRate
        outcome = crossRate * rateUSD
        break
      case 'EUR':
        const [currencyEUR] = currencyRates.data.filter(curr => curr.base === 'EUR'),
          ratesEUR = new Map(Object.entries(currencyEUR.rates)),
          rateEUR = ratesEUR.get(termCurrency)

        if (getEURRate === 'Inv') {
          const [ currencyData ] = currencyRates.data.filter(curr => curr.base === 'EUR')
          const rates = new Map(Object.entries(currencyData.rates))
          const getFirstRate = rates.get(baseCurrency)
          const getSecondRate = rates.get('USD')

          crossRate = baseCurrencyAmount / getFirstRate
          outcome = crossRate * getSecondRate
        } else {
          crossRate = baseCurrencyAmount * getEURRate
          outcome = crossRate * rateEUR
        }        
        break
      default:
        outcome = baseCurrencyAmount * getRate
    }

    if (isNaN(outcome)) {
      setHasError(true)
      setResult('')
      return
    }

    // two decimal places condition
    if (hasTDP) {
      formatFormat = formatCurrency(outcome, 2).toString()
    } else {
      formatFormat = outcome.toString()
    }

    setResult(formatFormat)
  }

  const errorContainer = (
    <Fade in={ hasError } className="mt-3">
      <div className="fx-calculator-error">
        <div>
          <span className="fx-calculator-error__text">
            <span className="fx-calculator-error__text__label">From:</span>
            { baseCurrency } { baseCurrencyAmount }
          </span>
        </div>
        <div>
          <span className="fx-calculator-error__text">
            <span className="fx-calculator-error__text__label">To:</span>
            { termCurrency }
          </span>
        </div>
        <div>
          <span className="fx-calculator-error__text">
            Unable to find rate for { baseCurrency } / { termCurrency }
          </span>
        </div>
      </div>
    </Fade>
  )

  return (
    <div className="fx-calculator">
      <h1 className="fx-header__title">
        Currency Calculator 
        <span className="fx-header__version-text">v0.5.0</span>
      </h1>
      <form className="fx-calculator__form" autoComplete="off">
        <div className="l-grid">
          <div className="form-group mr-2">
            <label className="fx-calculator-form__label" htmlFor="baseCurrencyAmount">
              Amount
            </label>
            <input
              type="number"
              id="baseCurrencyAmount"
              className="form-control fx-calculator-form__input"
              name="baseCurrencyAmount"
              value={baseCurrencyAmount}
              onChange={handleInputChange}
              onBlur={handleInputAmountBlur}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="form-group mr-4">
            <label htmlFor="baseCurrency" className="fx-calculator-form__label">
              From
            </label>
            <Input
              type="select"
              name="baseCurrency"
              id="baseCurrency"
              className="fx-calculator-form__input fx-calculator-form__input--code"
              value={baseCurrency}
              placeholder='asd'
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            >
              {currencyRates && currencyRates.data.map((currency) => (
                <option key={currency.base} value={currency.base}>
                  {currency.base}
                </option>
              ))}
            </Input>
          </div>
        </div>

        <div className="l-grid">
          <div className="l-grid__item">
            <div className="fx-calculator-form__input fx-calculator-form__input--empty mr-2" />
          </div>
          <div className="form-group mr-2">
            <label htmlFor="termCurrency" className="fx-calculator-form__label">
              To
            </label>
            <Input
              type="select"
              name="termCurrency"
              id="termCurrency"
              className="fx-calculator-form__input fx-calculator-form__input--code"
              value={termCurrency}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            >
              {currencyRates && currencyRates.data.map((currency) => (
                <option key={currency.base} value={currency.base}>
                  {currency.base}
                </option>
              ))}
            </Input>
          </div>

          <div className="form-group mr-2">
            <span className="fx-calculator-form__label">
              You will get
            </span>
            <div className="form-control fx-calculator-form__input disabled">
              <span className="fx-calculator-form__input__text">{result}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn fx-calculator-form__btn"
            onClick={currencyCalculateEvent}
            disabled={!baseCurrencyAmount || !baseCurrency || !termCurrency}
          >
            Convert
          </button>
        </div>

        <div className="l-grid">
          <div className="l-grid__item">
            <div className="fx-calculator-form__input fx-calculator-form__input--empty mr-2" />
          </div>
          {errorContainer}
        </div>

      </form>
    </div>
  )
}

function mapStateToProps(state) {
  const {
    isCurrencyRatesRequest,
    isCurrencyRatesSuccess,
    isCurrencyRatesFailure,
    currencyRates,
    currencyRatesError,
    currencyStore,
    currencyTDP,
  } = state.currency
  return {
    isCurrencyRatesRequest,
    isCurrencyRatesSuccess,
    isCurrencyRatesFailure,
    currencyRates,
    currencyRatesError,
    currencyStore,
    currencyTDP,
  }
}

export default connect(mapStateToProps)(FxCalculator)
