import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import { saveDeckTitle } from "../utils/api";
import { generateUID } from "../utils/helper";
import { addDeck } from "../actions";
import { purple, white, space } from "../utils/colors";

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.textBt}>Create Deck</Text>
        </TouchableOpacity>
    )
}

class NewDeck extends React.Component {

    state = {
        title: ''
    }

    submit = () => {
        const deckTitle = this.state.title
        saveDeckTitle(deckTitle)
        const deckObject = {
            title: deckTitle,
            id: generateUID(),
            cards: [],
        }
        this.props.dispatch(addDeck({
            [deckTitle]: deckObject
        }))
        this.setState({ title: '' })
        this.props.navigation.navigate('DeckView', {deck: deckObject})
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={title => this.setState({ title })}
                    value = {this.state.title}
                    clearButtonMode = {"while-editing"}
                />
                <View style={styles.butn}>
                    <SubmitBtn onPress={this.submit} />    
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: white,
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: '80%',
        alignItems: 'stretch',
        backgroundColor: white,
        marginBottom: 5,
        borderRadius: 7
    },
    butn: {
        height: 25,
        backgroundColor: space,
        borderRadius: 7,
        width: '50%',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBt: {
        fontSize: 20,
        color: purple,
    }
})

function mapStateToProps(deck) {
    return {
        deck
    }
}

export default connect(mapStateToProps)(NewDeck)