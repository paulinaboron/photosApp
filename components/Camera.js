//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ToastAndroid, BackHandler } from 'react-native';
import { Camera } from "expo-camera";
import { IconButton, Colors } from 'react-native-paper';
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';

// create a component
class Aparat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        };
    }

    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });

        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
        console.log("odświeżenie galerii");
        //powrót do ekranu poprzedniego
        this.props.navigation.navigate("Galeria", { refresh: true })
        return true;
    }

    switchCamera() {

        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    async takePhoto() {
        if (this.camera) {

            let foto = await this.camera.takePictureAsync();
            ToastAndroid.showWithGravity(
                'Picture taken',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
        }
    }

    async imagePicker() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {

            // formdata
            // fetch
            console.log("fetch", result);

            const data = new FormData();

            data.append('photo', {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'test'
            });

            let ip ="http://192.168.1.20:3000/upload"
    // let ip = "http://192.168.1.103:3000/upload"
            fetch(ip, {
                method: 'POST',
                body: data
            })

        }
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={styles.menu}>
                            <IconButton
                                icon="autorenew"
                                color="#303F9F"
                                size={50}
                                onPress={() => this.switchCamera()}
                            />
                            <IconButton
                                icon="camera"
                                color="#303F9F"
                                size={70}
                                onPress={() => this.takePhoto()}
                            />

                            <IconButton
                                icon="image"
                                color="#303F9F"
                                size={50}
                                onPress={() => this.imagePicker()}
                            />
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },

    button: {
        // backgroundColor: 'rgba(12, 12, 12, 0.5)'
        backgroundColor: 'blue'
    },

    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get("window").height - 170,
        alignItems: 'center'
    }
});

//make this component available to the app
export default Aparat;
