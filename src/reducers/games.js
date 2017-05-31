import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from '../constants'

export default function games(state = [], action = {}) {
  switch(action.type) {
    case ADD_GAME:
      return [
        ...state,
        action.game
      ];

    case SET_GAMES:
      return action.games;

    case GAME_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id);
      if(index > -1) {
        return state.map(item => {
          if (item._id === action.game._id) return action.game;
          return item;
        })
      } else {
        return [
          ...state,
          action.game
        ];
      }

    case GAME_UPDATED:
      return state.map(item => {
        if (item._id === action.game._id) return action.game;
        return item;
      });

    case GAME_DELETED:
      return state.filter( item => { return item._id !== action.gameId })

    default: return state;
  }
}