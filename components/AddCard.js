import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { white, } from '../utils/colors'
import {connect} from 'react-redux'
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { purple, space } from "../utils/colors";

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.textBt}>Add Card</Text>
        </TouchableOpacity>
    )
}

class AddCard extends React.Component {

    state = {
        question: '',
        answer: '',
    }

    submit = () => {
        const {question, answer} = this.state
        const deckTitle = this.props.deck.title
        const card = { question, answer }        
        addCardToDeck(deckTitle, card)
        this.props.addCard(deckTitle, card)
        this.setState({ question: '', answer: '' })
        this.props.navigation.navigate('DeckView', { deck: this.props.deck })
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder='Question'
                    onChangeText={question => this.setState({ question })}
                    value = {this.state.question}
                    clearButtonMode = {"while-editing"}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Answer'
                    onChangeText={answer => this.setState({ answer })}
                    value = {this.state.answer}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: purple,
    },
    input: {
        height: 40,
        width: '80%',
        alignItems: 'stretch',
        backgroundColor: white,
        marginBottom: 10,
        borderRadius: 8,
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
    
    const deck  = navigation.state.params       
    
    return {
        deck
    }
}

const mapDispatchToProps = dispatch => ({
    addCard: (deckTitle,card) => dispatch(addCard(deckTitle,card))
  })

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)