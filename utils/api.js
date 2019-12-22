import { AsyncStorage } from "react-native";
import { MOBILEFLASHCARD_STORAGE_KEY, generateUID, formatDecksResults } from "./helper";

export function getDecks() {
    return AsyncStorage.getItem(MOBILEFLASHCARD_STORAGE_KEY)
        .then(formatDecksResults)
}

export function getDeck(id) {
    return getDeck().then(decks => decks[id])
}

export function saveDeckTitle(deckTitle) {
    const titleObject = {title:deckTitle, id:generateUID(), cards:[] }
    return AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify({ [deckTitle]:titleObject }))
}

export function addCardToDeck(title, card) {
    return getDecks()
        .then(decks => {
            decks[title].cards.push(card)
            AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify(decks))
        })
}