import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <section data-testid="feedback-text">
            feedback
          </section>
        </main>
      </>
    );
  }
}

export default Feedback;
