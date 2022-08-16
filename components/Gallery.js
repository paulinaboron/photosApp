import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import * as MediaLibrary from "expo-media-library";

import FotoItem from './FotoItem';

let windowWidth = Dimensions.get("window").width

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numColumns: 3,
      photos: [],
      photoHeight: (windowWidth - 60) / 3,
      photoWidth: (windowWidth - 60) / 3,
      photosToDelete: [],
      photosToUpload: [],
    };

    this.funkcja = null

    this.width = Dimensions.get("window").width

  }

  async getPhotos() {
    let album = await MediaLibrary.getAlbumAsync("DCIM")

    let obj = await MediaLibrary.getAssetsAsync({
      first: 20,           // ilość pobranych assetów
      mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
      sortBy: MediaLibrary.SortBy.creationTime,
      album: album
    })

    this.setState({ photos: obj.assets })
  }

  componentDidMount = async () => {

    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('brak uprawnień do czytania image-ów z galerii')
    } else {
      this.getPhotos()
    }

    this.funkcja = this.props.navigation.addListener('focus', () => {
      this.refresh()
    });

  }

  componentWillUnmount() {
    this.funkcja();
  }

  refresh() {
    try {

      let filteredPhotos = this.state.photos.filter(e => {
        return e.id != this.props.route.params.deletedPhotoId
      })

      this.setState({ photos: filteredPhotos })
    } catch (e) {
      console.log('error');
    }

    try {
      if (this.props.route.params.refresh) {
        this.getPhotos()
      }
    } catch (e) {
      console.log("e");
    }

  }

  changeDisplay() {
    if (this.state.numColumns == 3) {
      this.setState({ numColumns: 1 })
      this.setState({ photoHeight: 110 })
      this.setState({ photoWidth: windowWidth - 20 })
    } else {
      this.setState({ numColumns: 3 })
      this.setState({ photoHeight: (windowWidth - 60) / 3 })
      this.setState({ photoWidth: (windowWidth - 60) / 3 })
    }
  }

  async deletePressed() {
    await MediaLibrary.deleteAssetsAsync(this.state.photosToDelete);

    this.getPhotos()
    this.setState({ photosToDelete: [] })
  }

  async uploadPressed() {

    const data = new FormData();

    this.state.photosToUpload.forEach(uri => {
      data.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: 'test'
      });
    });

    let ip ="http://192.168.1.20:3000/upload"
    // let ip = "http://192.168.1.103:3000/upload"
    fetch(ip, {
      method: 'POST',
      body: data
    })
    this.setState({ photosToUpload: [] })


    Alert.alert(
      "Alert",
      "All photos uploaded",
      [
        { text: "OK" }
      ]
    );


  }

  photoItemPressed = (id, isSelected, uri) => {
    console.log(id, isSelected, uri);
    if (isSelected) {
      this.setState({ photosToDelete: [...this.state.photosToDelete, id] })
      this.setState({ photosToUpload: [...this.state.photosToUpload, uri] })
    } else {
      let newTabId = this.state.photosToDelete.filter(e => {
        return e != id
      })

      this.setState({ photosToDelete: newTabId })

      let newTabUri = this.state.photosToUpload.filter(e => {
        return e != uri
      })

      this.setState({ photosToUpload: newTabUri })
    }
  }

  render() {


    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text
            onPress={() => this.changeDisplay()}
            style={styles.menuText}
          >GRID / LIST</Text>

          <Text
            onPress={() => this.props.navigation.navigate("Camera")}
            style={styles.menuText}
          >CAMERA</Text>

          <Text
            onPress={() => this.deletePressed()}
            style={styles.menuText}
          >DELETE</Text>

          <Text
            onPress={() => this.uploadPressed()}
            style={styles.menuText}
          >UPLOAD</Text>

          <Text
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.menuText}
          >SET</Text>
        </View>



        <FlatList
          numColumns={this.state.numColumns}
          key={this.state.numColumns}
          data={this.state.photos}

          renderItem={({ item }) => <FotoItem
            uri={item.uri}
            id={item.id}
            height={this.state.photoHeight}
            width={this.state.photoWidth}
            navigation={this.props.navigation}
            parentCallback={this.photoItemPressed}
          >
          </FotoItem>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10
  },

  menuText: {
    fontWeight: 'bold',
    fontSize: 18,
  }


})
