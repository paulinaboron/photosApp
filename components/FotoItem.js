import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1.0,
            selected: false
        };
    }

    selectedPhoto = (id) => {
        if (this.state.selected) {
            this.setState({ opacity: 1 })
            this.setState({ selected: false })
        } else {
            this.setState({ opacity: 0.2 })
            this.setState({ selected: true })
        }

    }
    photoSelected = (id, uri) => {
        if (this.state.selected) {
            this.setState({ opacity: 1 })
            this.setState({ selected: false })
            this.props.parentCallback(id, false, uri);
        } else {
            this.setState({ opacity: 0.2 })
            this.setState({ selected: true })
            this.props.parentCallback(id, true, uri);
        }
    }

    render() {
        return (
            <View style={[styles.photo, {
                width: this.props.width,
                height: this.props.height,
            }]}
            >
                <TouchableOpacity
                    onLongPress={() => this.props.navigation.navigate("Zdjęcie", { uri: this.props.uri, id: this.props.id, navigation: this.props.navigation })}
                    onPress={() => this.photoSelected(this.props.id, this.props.uri)}
                >
                    <Image
                        style={{
                            width: '100%',
                            height: this.props.height,
                        }}
                        source={{ uri: this.props.uri }}
                        opacity={this.state.opacity}
                        backgroundColor='black'
                    />
                    <Text style={styles.nr}>{this.props.id}</Text>
                </TouchableOpacity>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    photo: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        zIndex: 1
    },
    nr: {
        color: 'white',
        zIndex: 10,
    }
})
