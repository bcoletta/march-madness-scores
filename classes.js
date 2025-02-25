export class Game {
  constructor(apiGame) {
    this.winner = null;
    this.loser = null;

    this.setWinnerAndLoser(apiGame);
  }

  get score() {
    return [this.winner.score, this.loser.score];
  }

  get square() {
    const getLastDigit = (score) => {
      return parseInt(score.toString().slice(-1));
    }

    return this.score.map(s => getLastDigit(s));
  }

  setWinnerAndLoser(apiGame) {
    const competition = apiGame.competitions[0];
    const competitors = competition.competitors;

    competitors.forEach(c => {
      const gameTeam = new GameTeam({
        name: c.team.displayName,
        abbrev: c.team.abbreviation,
        score: c.score,
        winner: c.winner,
      });

      if (gameTeam.winner) this.winner = gameTeam;
      else this.loser = gameTeam;
    });
  }

  toString() {
    return `${this.winner.toString()} - ${this.loser.toString()}`;
  }
}

export class GameTeam {
  constructor(team) {
    this.name = team.name;
    this.abbrev = team.abbrev;
    this.score = parseInt(team.score);
    this.winner = team.winner;
  }

  toString() {
    return `${this.abbrev} ${this.score}`;
  }
}