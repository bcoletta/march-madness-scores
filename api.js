const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?limit=999'

const yearToMonths = (year) => {
  return `${year}0315-${year}0415`
}

export const getTourneyGamesByYear = (year) => {
  const dates = yearToMonths(year);
  const url = `${BASE_URL}&dates=${dates}`;

  console.log(`Fetching games for ${year} using ${url}`);

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`Fetched ${data.events.length} games for ${year}`);
      return data.events.filter(event => {
        event.competitions = event.competitions.filter(c => parseInt(c.tournamentId) === 22);

        return event.season.type === 3 && event.competitions.length;
      });
    });
}