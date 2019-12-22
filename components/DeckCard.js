import React from "react";
import { View, Text, StyleSheet, } from 'react-native'
import { white, } from '../utils/colors'

export default function DeckCard ({ deck }) {

    return(
        <View style={styles.center}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.card}>{deck.cards.length} Cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: white,
        marginBottom: 5,
    },
    card: {
        color: white,
        fontSize: 20
    }
})