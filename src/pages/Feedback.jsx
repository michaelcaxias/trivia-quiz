import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateRanking } from '../redux/actions';
import GRAVATAR_EMAIL from '../services';
import './Feedback.css';

class Feedback extends Component {
  async componentDidMount() {
    await this.addPlayerRanking();
    this.savePlayerLocalStorage();
  }

  addPlayerRanking() {
    // https://github.com/tryber/sd-07-project-trivia-react-redux/blob/main-group-8-req17Fix/src/pages/Feedback.js
    const {
      player: { name, score, gravatarEmail },
      dispatchUpdateranking,
    } = this.props;
    const picture = GRAVATAR_EMAIL(gravatarEmail);
    const ranking = { name, score, picture };
    dispatchUpdateranking(ranking);
  }

  savePlayerLocalStorage() {
    const { rankingList } = this.props;
    localStorage.setItem('ranking', JSON.stringify(
      rankingList.sort((a, b) => b.score - a.score),
    ));
  }

  render() {
    const { player: { assertions, score }, history } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <main className="main-content">
          <h2 data-testid="feedback-total-score">
            { `Pontuação : ${score}` }
          </h2>
          <h2 data-testid="feedback-total-question">
            { `Acertos : ${assertions} `}
          </h2>
          <h1 data-testid="feedback-text">
            {
              assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
            }
          </h1>
          <section className="buttons">
            <button
              className="btn"
              data-testid="btn-play-again"
              type="button"
              onClick={ () => history.push('/') }
            >
              Jogar Novamente

            </button>
            <button
              className="btn"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
              type="button"
            >
              Ver Ranking

            </button>
          </section>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  dispatchUpdateranking: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  rankingList: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => (
  {
    player: state.userReducer,
    rankingList: state.triviaReducer.ranking,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatchUpdateranking: (ranking) => dispatch(updateRanking(ranking)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
