'use strict';

const entrada = `underscore_case
 first_name
 Some_Variable 
  calculate_AGE
delayed_departure`;

// console.log(entrada);

const arreglar = texto => {
  const rows = texto.split('\n');
  for (const [i, row] of rows.entries()) {
    const [primero, segundo] = row.toLowerCase().trim().split('_');
    const texto = primero + segundo.replace(segundo[0], segundo[0].toUpperCase());
    console.log(texto.padEnd(25), ' ', '✅'.repeat(i + 1));
  }
  // console.log(cadenaNueva);
};

arreglar(entrada);

/* const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    ['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski'],
    ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze'],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: { team1: 1.33, x: 3.25, team2: 6.5 },
};

const gameEvents = new Map([
  [17, '⚽GOAL'],
  [36, '🔁Substitution'],
  [47, '⚽GOAL'],
  [61, '🔁Substitution'],
  [64, '🔶Yellow card'],
  [69, '🔴Red card'],
  [70, '🔁Substitution'],
  [72, '🔁Substitution'],
  [76, '⚽GOAL'],
  [80, '⚽GOAL'],
  [92, '🔶Yellow card'],
]);
// Challenge 3
// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
const minutos = 90 / gameEvents.size;
console.log(`Un evento ocurrio cada ${minutos} minutos.`);

// 4
for (const [key, valor] of gameEvents.entries()) {
  console.log('[', key < 45 ? 'FIRST' : 'SECOND', `HALF] ${key}: ${valor}`);
} */

/* // Challenge 2
// 1
for (const [gol, jugador] of game.scored.entries()) {
  console.log(`Goal ${gol + 1}: ${jugador}`);
}

// 2
const odds = Object.values(game.odds);
let media = 0;
for (const odd of odds) {
  media += odd;
}
console.log(media / odds.length);

//3
for (const [equipo, valor] of Object.entries(game.odds)) {
  const msg = equipo === 'x' ? 'draw' : `victory ${game[equipo]}`;
  console.log(`Odd of ${msg}: ${valor}`);
}

// 4
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers); */

/* // Challenge 1
// 1
const [players1, players2] = game.players;
console.log(players1, players2);

// 2
const [gk1, ...fieldPlayers1] = players1;
console.log(gk1, fieldPlayers1);

const [gk2, ...fieldPlayers2] = players2;
console.log(gk2, fieldPlayers2);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6
const printGoals = (...players) => {
  for (const player of players) {
    console.log(player);
  }
  console.log(players.length);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7
console.log((team1 < team2 && 'team1') || 'team2'); */
