import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const receiveDecks = () => dispatch => {
  getDecks().then(decks =>
      dispatch({
          type: RECEIVE_DECKS,
          decks  
      })
  ) 
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  } 
}

export function addCard (deck, card) {

  return {
    type: ADD_CARD,
    deck: deck,
    card,
  } 
}