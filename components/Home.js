import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Font from "expo-font";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/ApanageBold.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            this.state.fontloaded
                ?
                <View style={styles.container}>
                    <Text style={[styles.header, { fontFamily: 'myfont' }]} onPress={() => this.props.navigation.navigate("Galeria")}> Photos App </Text>
                </View>
                :
                null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303F9F',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        color: 'white',
        width: '80%',
        textAlign: 'center',
        fontSize: 90
    }
})
