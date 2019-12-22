import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { purple, white, space, } from "../utils/colors";

class DeckView extends React.Component {

    onPress = (toscreen) => {
        this.props.navigation.navigate(toscreen, this.props.deck)
    }

    render() {
        const deck = this.props.deck
        return(
            <View style={styles.container}>
                <View style={styles.deck}>
                    <View>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.card}>{deck.cards.length} cards</Text>
                    </View>
                         
                </View>
                <View style={styles.butn}>
                    <TouchableOpacity onPress={() => this.onPress('AddCard')}>
                        <Text style={styles.textBt}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.butn}>
                    <TouchableOpacity onPress={() => this.onPress('Quiz')}>
                        <Text style={styles.textBt}>Take Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: purple,
    },
    deck: {
        backgroundColor: white,
        height: '50%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
    title: {
        fontSize: 30,
        color: purple,
        marginBottom: 10,
        textAlign: 'center'
    },
    card: {
        fontSize: 20,
        color: purple,
        textAlign: 'center'
    },
    butn: {
        height: 25,
        backgroundColor: space,
        borderRadius: 7,
        width: '80%',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBt: {
        fontSize: 20,
        color: purple,
    }
})

function mapStateToProps(state, { navigation }) {
    
    const Sdeck  = navigation.state.params
    
    return {
        deck: Sdeck.deck
    }
}

export default connect(mapStateToProps)(DeckView)