import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'
import { purple, white, space, lightPurp, blue } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";

class Quiz extends React.Component {
    state = {
        currentCard: 0,
        correct: 0,
        showAnswer: false,
        complete: false
    }

    showBtn = () => {
        const {showAnswer} = this.state

        showAnswer === false ?
        this.setState({ showAnswer: true }) :
        this.setState({ showAnswer: false })
    }

    correctBt = () => {
        const {currentCard, correct} = this.state
        this.setState({
            currentCard: currentCard+1,
            correct: correct+1,
            showAnswer: false
        })
        if (currentCard === (this.props.deck.cards.length-1)) {
            this.setState({
                complete: true
            })
        }
    }

    incorrectBt = () => {
        const {currentCard} = this.state
        this.setState({
            currentCard: currentCard+1,
            showAnswer: false
        })
        if (currentCard === (this.props.deck.cards.length-1)) {
            this.setState({
                complete: true
            })
        }
    }

    retakeBt = () => {
        this.setState({
            currentCard: 0,
            correct: 0,
            showAnswer: false,
            complete: false
        })

        clearLocalNotification().then(setLocalNotification)
    }

    backBt = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { currentCard, correct, showAnswer, complete } = this.state
        const cards = this.props.deck.cards
        
        if (cards.length === 0) {
            return(
                <View style={styles.container}>
                    <Text style={{color:white, fontSize:30, textAlign:'center'}}>
                        Sorry you cannot take a quiz because there are no cards in the deck
                    </Text>
                </View>    
            )
        }

        return(
            <View style={styles.container}>
                {
                    complete === false ?
                    <View style={styles.container2}>
                        <View style={styles.deck}>
                            <Text style={styles.totalCards}>Card number {currentCard+1} of {cards.length}</Text>
                            {
                                showAnswer === false ?
                                <View style={styles.ques} >
                                    <Text style={styles.cardText}>{cards[currentCard].question}</Text>
                                    <View style={styles.showBtn}>
                                        <TouchableOpacity onPress={this.showBtn}>
                                            <Text style={{color:white}}>Show Answer</Text>
                                        </TouchableOpacity>    
                                    </View>
                                </View> :
                                <View style={styles.ques}>
                                    <Text style={styles.cardText}>{cards[currentCard].answer}</Text>
                                    <View style={styles.showBtn}>
                                        <TouchableOpacity onPress={this.showBtn}>
                                            <Text style={{color:white}}>Show Question</Text>
                                        </TouchableOpacity>    
                                    </View>
                                </View>
                            }
                        </View>
                        <View style={styles.butn}>
                            <TouchableOpacity onPress={this.correctBt}>
                                <Text style={styles.textBt}>Correct</Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={styles.butn}>
                            <TouchableOpacity onPress={this.incorrectBt}>
                                <Text style={styles.textBt}>Incorrect</Text>
                            </TouchableOpacity>    
                        </View>
                    </View> :
                    <View style={styles.container2}>
                        <View style={styles.deck}>
                            <Text style={styles.totalCards}>The quiz completed</Text>
                            <Text style={styles.totalCards}>Number of cards {cards.length}</Text>
                            <Text style={styles.totalCards}>Correct Answers {correct}</Text>    
                        </View>
                        <View style={styles.butn}>
                            <TouchableOpacity onPress={this.retakeBt}>
                                <Text style={styles.textBt}>Ratake Quiz</Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={styles.butn}>
                            <TouchableOpacity onPress={this.backBt}>
                                <Text style={styles.textBt}>Back to Deck View</Text>
                            </TouchableOpacity>    
                        </View>
                    </View>
                }
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
    container2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deck: {
        backgroundColor: white,
        height: '50%',
        width: '80%',
        justifyContent: 'space-around',
        alignContent: 'stretch',
        alignItems: 'center',
        borderRadius: 18,
    },
    totalCards:{
        color: purple, 
        fontWeight: 'bold',
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center'
      },
    ques: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '30%',
        width: "100%"
    },
    cardText: {
        fontSize: 30,
        color: blue,
        marginBottom: 5
    },
    showBtn: {
        backgroundColor: lightPurp,
        borderRadius: 7,
        width: '35%',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
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

export default connect(mapStateToProps)(Quiz)