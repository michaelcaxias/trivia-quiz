import React, { Component } from 'react';

class Ranking extends Component {
  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return ranking.map((element, index) => (
      <section key={ index }>
        <span data-testid={ `player-name-${index}` }>{element.name}</span>
        <span data-testid={ `player-score-${index}` }>{element.score}</span>
        <img src={ element.picture } alt={ element.name } />
      </section>
    ));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          { this.renderRanking() }
        </section>
      </div>
    );
  }
}

export default Ranking;
