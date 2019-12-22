import { AsyncStorage } from 'react-native'

export const MOBILEFLASHCARD_STORAGE_KEY = "Udacity:MobileFlashCards"


export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDecksResults(results) {
    const decks = JSON.parse(results)
    return decks
}