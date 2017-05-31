import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamesList from './GamesList';
import { fetchGames, deleteGame } from '../actions/games';
import PropTypes from 'prop-types';

class GamesPage extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div>
        <h1>Games List</h1>
        <GamesList games={this.props.games} deleteGame={this.props.deleteGame}/>
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  games: state.games
});

export default connect(mapStateToProps, {fetchGames, deleteGame})(GamesPage);