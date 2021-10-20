import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const GRAVATAR = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <header>
        <img
          src={ `${GRAVATAR}${EMAIL_TO_HASH(email)}` }
          alt="Gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (payload) => ({
  name: payload.userReducer.name,
  email: payload.userReducer.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
