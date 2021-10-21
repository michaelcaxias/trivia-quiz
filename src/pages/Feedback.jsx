import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player: { assertions, score }, history } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <main>
          <h2 data-testid="feedback-total-score">
            { score }
          </h2>
          <h2 data-testid="feedback-total-question">
            { assertions }
          </h2>
          <h1 data-testid="feedback-text">
            {
              assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
            }
          </h1>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Jogar Novamente

          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            type="button"
          >
            Ver Ranking

          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => (
  {
    player: state.userReducer,
  }
);

export default connect(mapStateToProps)(Feedback);
