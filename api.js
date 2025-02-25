const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?seasontype=3'

const yearToMonths = (year) => {
  return `${year}0315-${year}0430`
}

export const getTourneyGamesByYear = (year) => {
  const dates = yearToMonths(year);
  const url = `${BASE_URL}&dates=${dates}`;

  console.log(`Fetching ${url}`);

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return data.events.filter(event => event.season.type === 3);
    });
}