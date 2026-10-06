const thresholds = {
  weeks: 7, 
  months: 29,
  years: 365,
}

export function getElapsedTime(pastPlainDate) {
  const pastDate = new Date(pastPlainDate);
  const currentDate = new Date();

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((currentDate - pastDate) / msPerDay);

  let threshold; 
  for (const [key, value] of Object.entries(thresholds))  {
    if(totalDays > value) {
      threshold = key
    }
  };

  switch (threshold) {
    case "weeks": {
      const weeks = Math.round(totalDays / 7);
      return weeks > 1 ? weeks + ' semanas' : weeks + ' semana';
    };
    case "months": {
      const months = Math.round(totalDays / 30.44);
      return  months > 1 ? months + ' meses' : months + ' mes';
    };
    case "years": {
      const years = Math.round(totalDays / 365.25);
      return years > 1 ? years  + ' años' : years + ' año';
    }
    default: {
      if(totalDays === 0) return 'Hoy';
      if(totalDays >= 1) return totalDays + ' días';
      else return totalDays + ' días';
    }
  }
}

