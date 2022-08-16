import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            port: 3000,
            newPort: 3000,
            ip: '192.168.1.103',
            newIp: '192.168.1.103',
            dialogVisible: false
        };
    }

    editData = () => {
        this.setState({ dialogVisible: true })
    }

    handleSave = () => {
        this.setState({ dialogVisible: false })
        this.setState({ port: this.state.newPort })
        this.setState({ ip: this.state.newIp })
        console.log(this.state.port);
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false })
    }

    openWebApp = () => {
        console.log("opening Web App");
    }

    render() {
        return (
            <View style={styles.main}>
                <View>
                    <Text style={styles.text}> IP: {this.state.ip} </Text>
                    <Text style={styles.text}> PORT: {this.state.port} </Text>
                </View>


                <Text style={styles.text} onPress={this.editData}>Edytuj dane</Text>
                <Text style={styles.text} onPress={this.openWebApp}>Otwórz Web App</Text>

                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Edytowanie</Dialog.Title>

                        <Dialog.Input label='PORT' onChangeText={(text) => this.setState({ newPort: text })} />
                        <Dialog.Input label='IP' onChangeText={(text) => this.setState({ newIp: text })} />
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Save" onPress={this.handleSave} />
                    </Dialog.Container>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },

    text: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
