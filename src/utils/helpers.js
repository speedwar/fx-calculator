// Helpers

export const formatCurrency = (number, precision) => (
  Number.parseFloat(number).toFixed(precision)
)

export const isNumeric = (value) => (
  !isNaN(parseFloat(value)) && isFinite(value)
)