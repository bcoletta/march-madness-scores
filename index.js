const args = process.argv.slice(2);

if (!args.length) {
  console.error('Missing year parameter. Run `node index.js --help` for more information.');
  process.exit();
}

if (args[0] === '--help') {
  console.log('There is one required and one optional arg for this script.');
  console.log('Arg 1: START_YEAR - the first year of data to be retrieved. Earliest possible value is 2002.');
  console.log('Arg 2: END_YEAR - if empty, this will be set to the START_YEAR');
  process.exit();
}

import { getTourneyGamesByYear } from './api.js';
import { Game } from './classes.js';

const START_YEAR = parseInt(args[0]);
const END_YEAR = args[1] ? parseInt(args[1]) : START_YEAR;
const YEAR_STR = START_YEAR === END_YEAR ? `${START_YEAR}` : `${START_YEAR} - ${END_YEAR}`;

let ALL_SCORES = [];
let OUTPUT = {};

const aggregate = (games) => {
  let returnArr = [];

  games.forEach(game => {
    const existingScore = returnArr.find(ys => (ys[0] === game[0] && ys[1] === game[1]));

    if (existingScore) {
      existingScore[2]++;
    } else {
      returnArr.push([ ...game, 1 ]);
    }
  });

  return returnArr.sort((a,b) => b[2] - a[2]);
}

let currentYear = START_YEAR;
let ALL_GAMES = [];

while (currentYear <= END_YEAR) {
  const apiGames = await getTourneyGamesByYear(currentYear);
  console.log(`Found ${apiGames.length} tourney games for ${currentYear}`);
  const games = apiGames.map(g => new Game(g).square);
  const aggregatedGames = aggregate(games);

  ALL_GAMES = [ ...ALL_GAMES, ...games ];

  OUTPUT[currentYear] = aggregatedGames;

  currentYear++;
}

ALL_SCORES = aggregate(ALL_GAMES);

OUTPUT.all = ALL_SCORES;

console.log(OUTPUT);