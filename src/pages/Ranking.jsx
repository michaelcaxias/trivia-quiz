import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking.map((element, index) => (
      <section key={ index }>
        <span data-testid={ `player-name-${index}` }>{element.name}</span>
        <span data-testid={ `player-score-${index}` }>{element.score}</span>
        <img src={ element.picture } alt={ element.name } />
      </section>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          { this.renderRanking() }
        </section>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          type="button"
        >
          Tela de login

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
