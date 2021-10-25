import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Image, Table, Button } from 'semantic-ui-react';
import { default as HeaderComponent } from '../components/Header';
import './Ranking.css';

class Ranking extends Component {
  renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking.map((element, index) => (
      <Table.Row key={ index }>
        <Table.Cell>
          <Header as="h4" image>
            <Image src={ element.picture } rounded size="mini" />
            <Header.Content data-testid={ `player-name-${index}` }>
              { element.name }
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell data-testid={ `player-score-${index}` }>{ element.score }</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <HeaderComponent />
        <section className="table-container">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Table basic="very" celled collapsing selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { this.renderRanking() }
            </Table.Body>
          </Table>
          <Button
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Tela de login

          </Button>
        </section>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
