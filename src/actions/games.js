import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from '../constants';

export const setGames = (games) => ({
  type: SET_GAMES,
  games: games
})

export const fetchGames = () => (
  dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)))
  }
)

export const gameFetched = (game)  => ({
  type: GAME_FETCHED,
  game: game
})

export const fetchGame = (id) => (
  dispatch => {
    fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)))
  }
)

const handleResponse = (response) => {
  if(response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText)
    error.response = response;
    throw error;
  }
}

export const addGame = (game)  => ({
  type: ADD_GAME,
  game: game
})

export const saveGame = (data)  => (
  dispatch => {
    return fetch('/api/games', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addGame(data.game)))
  }
);

export const gameUpdated = (game)  => ({
  type: GAME_UPDATED,
  game: game
})

export const updateGame = (data)  => (
  dispatch => {
    return fetch(`/api/games/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameUpdated(data.game)))
  }
);

export const gameDeleted = (gameId)  => ({
  type: GAME_DELETED,
  gameId: gameId
})

export const deleteGame = (id)  => (
  dispatch => {
    return fetch(`/api/games/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameDeleted(id)))
  }
)