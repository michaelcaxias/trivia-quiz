import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import gravatarImage from '../services';
import './Header.css';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <header className="header">
        <img
          className="gravatar"
          src={ gravatarImage(gravatarEmail) }
          alt="Gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.userReducer,
});

export default connect(mapStateToProps)(Header);
