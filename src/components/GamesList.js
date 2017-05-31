import React, { Component } from 'react'
import GameCard from './GameCard';
import PropTypes from 'prop-types';

class GamesList extends Component {
  render() {
    var games = this.props.games;
    const emptyMessage = <p>There are no games yet in your collection.</p>;
    const gamesList = (
      <div className="ui four cards">
        { games.map(game => <GameCard game={game} key={game._id} deleteGame={this.props.deleteGame} /> )}
      </div>
    );

    return(
      <div>
        { games.length === 0 ? emptyMessage : gamesList }
      </div>
    );
  }
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  deleteGame: PropTypes.func.isRequired
}

export default GamesList;