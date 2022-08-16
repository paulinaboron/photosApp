import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';

export default class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async deletePressed() {
        console.log("dddd id", this.props.route.params.id);
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.id]);
        this.props.navigation.navigate('Galeria', { deletedPhotoId: this.props.route.params.id })
    }

    sharePhoto() {
        Sharing.shareAsync(this.props.route.params.uri)
    }

    uploadPressed() {
        const data = new FormData();

        data.append('photo', {
            uri: this.props.route.params.uri,
            type: 'image/jpeg',
            name: 'test'
        });

        let ip = "http://192.168.1.20:3000/upload"
        // let ip = "http://192.168.1.103:3000/upload"
        fetch(ip, {
            method: 'POST',
            body: data
        })

        Alert.alert(
            "Alert",
            "Photo uploaded",
            [
                { text: "OK" }
            ]
        );
    }

    render() {
        return (
            <View>
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.route.params.uri }}
                />

                <View style={styles.menu}>
                    <Text
                        style={styles.text}
                        onPress={() => this.sharePhoto()}
                    >SHARE</Text>
                    <Text
                        style={styles.text}
                        onPress={() => this.deletePressed()}
                    >DELETE</Text>
                    <Text
                        style={styles.text}
                        onPress={() => this.uploadPressed()}
                    >UPLOAD</Text>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    photo: {
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: 20,
        marginTop: 20,
        width: '90%',
        height: '85%',
    },

    text: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
    },

    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

})
