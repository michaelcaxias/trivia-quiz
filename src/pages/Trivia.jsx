import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchTrivia } from '../redux/actions';
import './Trivia.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    const { nameFromGlobalState, emailFromGlobalState } = props;
    this.state = {
      time: 30,
      questionIndex: 0,
      player: {
        name: nameFromGlobalState,
        assertions: '',
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
    const newScore = this.getScore(name);
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        score: prevState.player.score + newScore,
      },
    }), () => this.saveLocalStorage());
  }

  nextQuestion() {
    this.setState((prevState) => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
      time: 30,
    }));
    this.removeColor();
    this.updateSeconds();
  }

  borderColor() {
    clearInterval(this.timer);
    const rightBtn = document.querySelector('.correct-answer');
    const wrongBtn = document.querySelectorAll('.wrong-answer');
    const nextBtn = document.querySelector('.btn-next');
    rightBtn.classList.add('correct_answer');
    rightBtn.disabled = true;
    wrongBtn.forEach((button) => {
      button.classList.add('wrong_answer');
      button.disabled = true;
    });
    nextBtn.className = 'visible';
  }

  removeColor() {
    const rightBtn = document.querySelector('.correct-answer');
    const wrongBtn = document.querySelectorAll('.wrong-answer');
    const nextBtn = document.querySelector('.visible');
    rightBtn.classList.remove('correct_answer');
    rightBtn.disabled = false;
    wrongBtn.forEach((button) => {
      button.classList.remove('wrong_answer');
      button.disabled = false;
    });
    nextBtn.className = 'btn-next';
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
    return (
      <section>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <section>
          <button
            data-testid="correct-answer"
            className="correct-answer"
            name="right"
            type="button"
            onClick={ this.handleClick }
          >
            { correctAnswer }

          </button>
          { incorrectAnswers.map((answer, i) => (
            <button
              key={ i }
              data-testid={ `wrong-answer-${i}` }
              className="wrong-answer"
              name="wrong"
              type="button"
              onClick={ this.handleClick }
            >
              { answer }

            </button>
          )) }
        </section>
        <button
          onClick={ this.nextQuestion }
          type="button"
          data-testid="btn-next"
          className="btn-next"
        >
          Próxima

        </button>
        <h1>
          { time }
        </h1>
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
