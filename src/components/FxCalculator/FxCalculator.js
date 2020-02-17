import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { currencyActions } from 'rx/actions'
import { Input } from 'reactstrap';
import { formatCurrency, isNumeric } from 'utils'

const FxCalculator = (props) => {
  const
    [ baseCurrencyAmount, setBaseCurrencyAmount ] = useState(''),
    [ baseCurrency, setBaseCurrency ] = useState(''),
    [ termCurrency, setTermCurrency ] = useState(''),
    [ result, setResult ] = useState(''),
    [ hasError, setHasError ] = useState(false)

  // load currency rates on DOMcontentLoad is ready
  useEffect(() => {
    const { dispatch } = props
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
    const { currencyRates } = props 
    const [ selectedCurrency ] = currencyRates.data.filter(curr => curr.base === baseCurrency)

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
        const [invCurremcy] = currencyRates.data.filter(curr => curr.base === termCurrency)
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
        const [currencyUSD] = currencyRates.data.filter(curr => curr.base === 'USD'),
          ratesUSD = new Map(Object.entries(currencyUSD.rates)),
          rateUSD = ratesUSD.get(termCurrency)

        crossRate = baseCurrencyAmount * getUSDRate
        result = crossRate * rateUSD
        resultString = formatCurrency(result, 2).toString()
        break
      case 'EUR':
        const [currencyEUR] = currencyRates.data.filter(curr => curr.base === 'EUREUR'),
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
  )

  const { currencyRates } = props

  return (
    <div className="fx-calculator">
      <h1 className="fx-header__title">
        Currency Calculator 
        <span className="fx-header__version-text">v0.2.1</span>
        <span className="fx-header__version-text">Developed by Jimmy Lee</span>
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
          <label htmlFor="baseCurrency" className="fx-calculator-form__label">
            From
          </label>
          <Input
            type="select"
            name="baseCurrency"
            id="baseCurrency"
            // className="form-control fx-calculator-form__input fx-calculator-form__input--code"
            value={baseCurrency}
            onChange={ handleInputChange }
          >
            {currencyRates && currencyRates.data.map((currency) => (
              <option key={ currency.base } value={ currency.base }>
                { currency.base }
              </option>
            ))}
          </Input>
        </div>

        <div className="form-group mr-2">
          <label htmlFor="termCurrency" className="fx-calculator-form__label">
            To
          </label>
          <Input
            type="select"
            name="termCurrency"
            id="termCurrency"
            // className="form-control fx-calculator-form__input fx-calculator-form__input--code"
            value={ termCurrency }
            onChange={handleInputChange}
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
        >
          Go
        </button>
      </form>
      { hasError && errorContainer }
    </div>
  )
}

function mapStateToProps(state) {
  const {
    isCurrencyRatesRequest,
    isCurrencyRatesSuccess,
    isCurrencyRatesFailure,
    currencyRates,
    currencyRatesError
  } = state.currency
  return {
    isCurrencyRatesRequest,
    isCurrencyRatesSuccess,
    isCurrencyRatesFailure,
    currencyRates,
    currencyRatesError
  }
}

export default connect(mapStateToProps)(FxCalculator)
