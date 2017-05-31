import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class GameCard extends Component {
  render() {
    var game = this.props.game;
    return(
      <div className='ui card'>
        <div className="image">
          <img src={ game.cover } alt={ game.cover } />
        </div>
        <div className="content">
          <div className="header">{ game.title }</div>
        </div>
        <div className="content extra">
          <ui className="two buttons">
            <Link to={`/game/${game._id}`} className="ui basic button green">Edit</Link>
            <div className="ui basic button red" onClick={() => this.props.deleteGame(game._id)} >Delete</div>
          </ui>
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
}

export default GameCard;