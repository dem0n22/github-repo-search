export function formatNumber(value){
  const number = Number(value);
  if(Number.isNaN(number)) {
    throw new Error('El valor del parámetro value debe ser de tipo number o string.')
  }

  return number > 1000 ? (number / 1000).toFixed(1) + "k" : number + "";
}

export function calculatePercentages (percentages) {
  const total =  Object.values(percentages).reduce((total, value) => total + value, 0);

  const result = {}

  if (total === 0) {
    return result; 
  }

  for(const [key, value] of Object.entries(percentages)) {
    const percentage = parseFloat(((value / total) * 100).toFixed(1));
    if(percentage >= 0.1) result[key] = percentage;
  }

  return result;
}

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}