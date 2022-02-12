import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchTrivia, sendInfosPlayer } from '../redux/actions';
import './Trivia.css';

const encodeUtf8 = (string) => {
  // função do Lucas Rodrigues Turma 08
  const stringUTF = unescape(encodeURIComponent(string));
  return stringUTF.replace(/&quot;|&#039;/gi, '\'');
};

class Trivia extends Component {
  constructor(props) {
    super(props);
    const { nameFromGlobalState, emailFromGlobalState } = props;
    this.state = {
      time: 30,
      questionIndex: 0,
      player: {
        name: nameFromGlobalState,
        assertions: 0,
        score: 0,
        gravatarEmail: emailFromGlobalState,
      },
    };

    this.Content = this.Content.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateSeconds = this.updateSeconds.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.countAssertions = this.countAssertions.bind(this);
  }

  componentDidMount() {
    const { jsonToGlobalState } = this.props;
    const token = localStorage.getItem('token');
    jsonToGlobalState(token);
    this.updateSeconds();
    this.saveLocalStorage();
  }

  componentDidUpdate() {
    const { time } = this.state;
    const TIME_LIMIT = 0;
    if (time === TIME_LIMIT) {
      this.borderColor();
    }
  }

  getScore(answer) {
    if (answer === 'right') {
      const EASY = 1;
      const MEDIUM = 2;
      const HARD = 3;

      const TEN = 10;

      const { time, questionIndex } = this.state;
      const { questions } = this.props;
      switch (questions[questionIndex].difficulty) {
      case 'easy':
        return TEN + (time * EASY);
      case 'medium':
        return TEN + (time * MEDIUM);
      case 'hard':
        return TEN + (time * HARD);
      default:
        return 0;
      }
    }
    return 0;
  }

  saveLocalStorage() {
    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  handleClick({ target: { name } }) {
    this.borderColor();
    this.countAssertions(name);
    const newScore = this.getScore(name);
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        score: prevState.player.score + newScore,
      },
    }), () => this.saveLocalStorage());
  }

  countAssertions(name) {
    if (name === 'right') {
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
        },
      }));
    }
  }

  nextQuestion() {
    const FINAL_QUESTION_INDEX = 4;
    const { questionIndex, player } = this.state;
    const { history, dispatchPlayerToGlobalState } = this.props;
    dispatchPlayerToGlobalState(player);
    if (questionIndex === FINAL_QUESTION_INDEX) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        ...prevState,
        questionIndex: prevState.questionIndex + 1,
        time: 30,
      }));
      this.removeColor();
      this.updateSeconds();
    }
  }

  borderColor() {
    clearInterval(this.timer);
    const rightBtn = document.querySelector('[name="right"]');
    const wrongBtn = document.querySelectorAll('[name="wrong"]');
    const nextBtn = document.querySelector('.btn-next');
    rightBtn.classList.add('is-success');
    rightBtn.disabled = true;
    wrongBtn.forEach((button) => {
      button.classList.add('is-danger');
      button.disabled = true;
    });
    nextBtn.classList.toggle('visible');
  }

  removeColor() {
    const rightBtn = document.querySelector('[name="right"]');
    const wrongBtn = document.querySelectorAll('[name="wrong"]');
    const nextBtn = document.querySelector('.visible');
    rightBtn.classList.remove('is-success');
    rightBtn.disabled = false;
    wrongBtn.forEach((button) => {
      button.classList.remove('is-danger');
      button.disabled = false;
    });
    nextBtn.classList.toggle('visible');
  }

  updateSeconds() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SECOND);
  }

  Content() {
    const { questions } = this.props;
    const { time, questionIndex } = this.state;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[questionIndex];
    const correctAnswerElement = (
      <button
        data-testid="correct-answer"
        className="button"
        name="right"
        type="button"
        onClick={ this.handleClick }
      >
        { encodeUtf8(correctAnswer) }

      </button>
    );
    const incorrectAnswersElement = incorrectAnswers.map((answer, i) => (
      <button
        key={ i }
        className="button"
        name="wrong"
        type="button"
        onClick={ this.handleClick }
      >
        { encodeUtf8(answer) }

      </button>
    ));

    return (
      <section className="section">
        <h1 className="timer">
          { time }
        </h1>
        <p className="category" data-testid="question-category">{ category }</p>
        <p className="question" data-testid="question-text">{ encodeUtf8(question) }</p>
        <section className="alternatives">
          {[...incorrectAnswersElement, correctAnswerElement]
            .sort(({ props: { children: a } }, { props: { children: b } }) => (
              a.localeCompare(b)
            )) }
        </section>
        <button
          onClick={ this.nextQuestion }
          type="button"
          className="button is-primary btn-next"
        >
          Próxima

        </button>
      </section>
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <>
        <Header />
        <main>
          { isFetching ? 'LOADING...'
            : this.Content() }
        </main>
      </>
    );
  }
}

Trivia.propTypes = {
  isFetching: PropTypes.any,
  jsonToGlobalState: PropTypes.func,
  questions: PropTypes.any,
}.isRequired;

const mapDispatchToProps = (dispatch) => (
  {
    jsonToGlobalState: (token) => dispatch(fetchTrivia(token)),
    dispatchPlayerToGlobalState: (player) => dispatch(sendInfosPlayer(player)),
  }
);

const mapStateToProps = (state) => (
  {
    isFetching: state.triviaReducer.isFetching,
    questions: state.triviaReducer.questions,
    nameFromGlobalState: state.userReducer.name,
    emailFromGlobalState: state.userReducer.gravatarEmail,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
