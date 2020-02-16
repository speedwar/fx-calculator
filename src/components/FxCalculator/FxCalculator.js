import React, { useState } from 'react'
import { formatCurrency, isNumeric } from 'utils'
import currencyRate from 'utils/mockdata/currencyData'

const FxCalculator = () => {
  const
    [ baseCurrencyAmount, setBaseCurrencyAmount ] = useState(''),
    [ baseCurrency, setBaseCurrency ] = useState(''),
    [ termCurrency, setTermCurrency ] = useState(''),
    [ result, setResult ] = useState(''),
    [ hasError, setHasError ] = useState(false)

  const handleInputChange = (e) => {
    const target = e.target,
      value = target.value,
      name = target.name

    switch(name) {
      case 'baseCurrencyAmount':
        setBaseCurrencyAmount(value)
        break
      case 'baseCurrency':
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
      value = target.value

    if (isNumeric(value)) {
      const formatDollars = formatCurrency(value, 2)
      setBaseCurrencyAmount(formatDollars)
    }
  }

  const handleInputCurrencyBlur = (e) => {
    const target = e.target,
      value = target.value,
      name = target.name
    let stringValidation 

    switch (name) {
      case 'baseCurrency':
        if (isNumeric(value)) {
          setBaseCurrency('')
        } else {
          stringValidation = value.toUpperCase()
          setBaseCurrency(stringValidation)
        }
        break
      case 'termCurrency':
        if (isNumeric(value)) {
          setTermCurrency('')
        } else {
          stringValidation = value.toUpperCase()
          setTermCurrency(stringValidation)
        }
        break
      default:
        break
    }
  }

  const handleInputAmountFocus = () => {
    if (hasError) {
      setHasError(false)
    }
  }

  const currencyCalculateEvent = (e) => {
    e.preventDefault() // prevents page refresh
    const [ selectedCurrency ] = currencyRate.data.filter(curr => curr.base === baseCurrency)

    if (!selectedCurrency) {
      setHasError(true)
      setResult('')
      return
    }

    const rates = new Map(Object.entries(selectedCurrency.rates))
    const getRate = rates.get(termCurrency)

    if (!getRate) {
      setHasError(true)
      setResult('')
      return
    }

    const getUSDRate = rates.get('USD')
    const getEURRate = rates.get('EUR')
    setHasError(false)

    let crossRate
    let result
    let resultString

    switch(getRate) {
      case 'Inv':
        const [ invCurremcy ] = currencyRate.data.filter(curr => curr.base === termCurrency)
        const ratesInv = new Map(Object.entries(invCurremcy.rates))
        const getInvRate = ratesInv.get(baseCurrency)

        result = baseCurrencyAmount / getInvRate
        resultString = formatCurrency(result, 2).toString()
        break
      case '1:1':
        result = baseCurrencyAmount
        resultString = formatCurrency(result, 2).toString()
        break
      case 'USD':
        const [ currencyUSD ] = currencyRate.data.filter(curr => curr.base === 'USD'),
          ratesUSD = new Map(Object.entries(currencyUSD.rates)),
          rateUSD = ratesUSD.get(termCurrency)

        crossRate = baseCurrencyAmount * getUSDRate
        result = crossRate * rateUSD
        resultString = formatCurrency(result, 2).toString()
        break
      case 'EUR':
        const [ currencyEUR ] = currencyRate.data.filter(curr => curr.base === 'EUREUR'),
          ratesEUR = new Map(Object.entries(currencyEUR.rates)),
          rateEUR = ratesEUR.get(termCurrency)

        crossRate = baseCurrencyAmount * getEURRate
        result = crossRate * rateEUR
        resultString = formatCurrency(result, 2).toString()
        break
      default:
        result = baseCurrencyAmount * getRate
        resultString = formatCurrency(result, 2).toString()
    }

    setResult(resultString)
  }

  const errorContainer = (
    <div className="fx-calculator-error">
      <div>
        <span className="fx-calculator-error__text">
          <span className="fx-calculator-error__text__label">From:</span>
          {baseCurrency} {baseCurrencyAmount}
        </span>
      </div>
      <div>
        <span className="fx-calculator-error__text">
          <span className="fx-calculator-error__text__label">To:</span>
          {termCurrency}
        </span>
      </div>
      <div>
        <span className="fx-calculator-error__text">
          Unable to find rate for {baseCurrency} / {termCurrency}
        </span>
      </div>
    </div>
  )

  return (
    <div className="fx-calculator">
      <h1 className="fx-header__title">
        Currency Calculator 
        <span className="fx-header__version-text">v0.1</span>
      </h1>
      <form className="l-grid" autoComplete="off">
        <div className="form-group mr-2">
          <label className="fx-calculator-form__label" htmlFor="baseCurrencyAmount">
            Amount
          </label>
          <input
            type="number"
            id="baseCurrencyAmount"
            className="form-control fx-calculator-form__input"
            name="baseCurrencyAmount"
            value={ baseCurrencyAmount }
            onChange={ handleInputChange }
            onBlur={ handleInputAmountBlur }
            onFocus={ handleInputAmountFocus }
          />
        </div>

        <div className="form-group mr-4">
          <label className="fx-calculator-form__label" htmlFor="baseCurrency">
            From
          </label>
          <input
            type="text"
            id="baseCurrency"
            className="form-control fx-calculator-form__input fx-calculator-form__input--code"
            name="baseCurrency"
            value={ baseCurrency }
            placeholder="AUD"
            maxLength="3"
            onChange={ handleInputChange }
            onBlur={ handleInputCurrencyBlur }
            onFocus={ handleInputAmountFocus }
          />
        </div>

        <div className="form-group mr-2">
          <label className="fx-calculator-form__label" htmlFor="termCurrency">
            To
          </label>
          <input
            type="text"
            id="termCurrency"
            className="form-control fx-calculator-form__input fx-calculator-form__input--code"
            name="termCurrency"
            value={ termCurrency }
            placeholder="USD"
            maxLength="3"
            onChange={ handleInputChange }
            onBlur={ handleInputCurrencyBlur }
            onFocus={ handleInputAmountFocus }
          />
        </div>

        <div className="form-group mr-2">
          <span className="fx-calculator-form__label">
            Amount
          </span>
          <div className="form-control fx-calculator-form__input disabled">
            <span className="fx-calculator-form__input__text">{ result }</span>
          </div>
        </div>

        <button 
          type="button"
          className="btn fx-calculator-form__btn"
          onClick={ currencyCalculateEvent }
          disabled={ baseCurrencyAmount === '' || baseCurrency === '' || termCurrency === '' }
        >
          Go
        </button>
      </form>
      { hasError && errorContainer }
    </div>
  )
}

export default FxCalculator