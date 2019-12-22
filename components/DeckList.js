import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { receiveDecks } from "../actions";
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import DeckCard from "./DeckCard";

class DeckList extends React.Component {

    componentDidMount() {
        receiveDecks()
    }

    render() {
        return(
                <FlatList
                    data = { Object.values(this.props.decks) }
                    renderItem = {({ item }) =>
                        <View style={styles.item}>
                            <TouchableOpacity onPress = {() => this.props.navigation.navigate('DeckView', {deck: item})}>
                                <DeckCard deck={item} />
                            </TouchableOpacity>    
                        </View>
                    }
                    keyExtractor= {item => item.id}
                />    
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: purple,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)