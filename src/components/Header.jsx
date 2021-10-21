import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const GRAVATAR = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();

class Header extends Component {
  render() {
    const { player: { name, email, score } } = this.props;
    return (
      <header>
        <img
          src={ `${GRAVATAR}${EMAIL_TO_HASH(email)}` }
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
