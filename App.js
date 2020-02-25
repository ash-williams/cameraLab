import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      token: "9b8b54adf543379848a7bd36336184a6"
    }
  }

  takePicture = async() => {
    if(this.camera){
      const options = {quality:0.5, base64:true}
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri, this.state.token);

      return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",
      {
        method: 'POST',
        headers: {
          "Content-Type": "image/jpeg",
          "X-Authorization": this.state.token
        },
        body: data
      })
      .then((response) => {
        Alert.alert("Picture Added!");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render(){
    return(
      <View style={{flex:1, width:'100%'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
            }}
          style={{
            flex:1,
            width: '100%'
            }}
          />
          <Button title="Take Photo" onPress={() => {this.takePicture()}} />
      </View>
      )
  }
}

export default App;
