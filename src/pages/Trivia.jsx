import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchTrivia } from '../redux/actions';
import './Trivia.css';

class Trivia extends Component {
  constructor() {
    super();
    this.Content = this.Content.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { jsonToGlobalState } = this.props;
    const token = localStorage.getItem('token');
    jsonToGlobalState(token);
  }

  handleClick() {
    const rightBtn = document.querySelector('.correct-answer');
    const wrongBtn = document.querySelectorAll('.wrong-answer');
    rightBtn.classList.add('correct_answer');
    wrongBtn.forEach((button) => {
      button.classList.add('wrong_answer');
    });
  }

  Content() {
    const { questions, index } = this.props;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[index];
    return (
      <section>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <section>
          <button
            data-testid="correct-answer"
            className="correct-answer"
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
              type="button"
              onClick={ this.handleClick }
            >
              { answer }

            </button>
          )) }
        </section>
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
  index: PropTypes.number,
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
    index: state.triviaReducer.index,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
