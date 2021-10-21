import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <main>
          <h1 data-testid="feedback-text">
            {
              assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'
            }
          </h1>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => (
  {
    assertions: state.userReducer.assertions,
  }
);

export default connect(mapStateToProps)(Feedback);
