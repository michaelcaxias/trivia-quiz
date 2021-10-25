import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmail, getName } from '../redux/actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { history, nameToGlobalState, emailToGlobalState } = this.props;
    const { name, email } = this.state;
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const resolve = await request.json();
    localStorage.setItem('token', resolve.token);
    nameToGlobalState(name);
    emailToGlobalState(email);
    history.push('/trivia');
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    const disabled = name !== '' && email !== '';
    return (
      <main className="main-container">
        <section className="conteiner">
          <input
            className="input"
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Nome"
          />
          <input
            className="input"
            type="text"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <div className="buttons">
            <button
              className="button is-primary is-outlined"
              type="button"
              disabled={ !disabled }
              onClick={ this.handleClick }
              data-testid="btn-play"
            >
              Jogar

            </button>
            <button
              className="button is-link is-outlined"
              onClick={ () => history.push('/settings') }
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </div>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  emailToGlobalState: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  nameToGlobalState: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => (
  {
    nameToGlobalState: (name) => dispatch(getName(name)),
    emailToGlobalState: (email) => dispatch(getEmail(email)),
  }
);

export default connect(null, mapDispatchToProps)(Login);
