// Helpers

export const formatCurrency = (number, precision) => (
  Number.parseFloat(number).toFixed(precision)
)

export const isNumeric = (value) => (
  !isNaN(parseFloat(value)) && isFinite(value)
)

export const isEmtpy = (value) =>  {
  if (typeof value === 'object') {
    console.warn(`must pass Object as an argument`)
    return
  }
  return Object.keys(value).length === 0
}