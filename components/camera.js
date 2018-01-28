import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Vibration,
  Button,
  Alerts,
  AsyncStorage
} from 'react-native';
import Toast from 'react-native-simple-toast'
import {
  StackNavigator,
} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../config/api.json'

import Camera from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';


export class QrCamera extends Component {
	static navigationOptions =({navigation}) => ({
	  title: 'Camera',
	  headerRight: <Button title="Settings" onPress ={() => navigation.navigate('Confirmation')}/>
	});
  constructor(props){
	super(props)
	this.state = {
	  detected: false,
	  visible: true,
	  full_json: null,
	  location: null,
	}
	this.resetState = this.resetState.bind(this)
  }
  componentWillMount(){
	AsyncStorage.multiGet(["fd_json", "current_location"], (err, stores) => {
	  stores.map((result, i, store) => {
		  console.log("Store 0: " + store[0][1] + " Store 1: " + store[1][1])
		if(store[0][1] != null)
			this.setState({full_json: store[0][1]})
		if(store[1][1] != null)
			  this.setState({location: store[1][1]})
	  });
	});
	this.setState({detected: false, visible: false})
  }
  resetState(){
	console.log("entered")
	this.setState({detected: false})
  }
	render() {
		let camera = null
		if(!this.state.visible)
			camera = <Camera
			  ref={(cam) => {
				this.camera = cam;
			  }}
			  style={styles.preview}
			  aspect={Camera.constants.Aspect.fill}
			  onBarCodeRead = {this.barcode.bind(this)}>
			</Camera>
	  return (
		<View style={styles.container}>
		<Spinner visible={this.state.visible}>
			  </Spinner>
		  {camera}
		</View>
	  );
	}
	barcode(event){
	  this.setState({visible: true})
	  console.log(JSON.parse(event.data))
	  console.log(String(API.API.AA) + "user?email=" + JSON.parse(event.data)['email'])
	  fetch(String(API.API.AA) + "user?email=" + JSON.parse(event.data)['email'])
	   .then(response => response.json())
	   .then(responseJson => {
		  if(JSON.parse(event.data)['error'] === "User could not be found"){
			  Vibration.vibrate()
			  Toast.show("User doesn't exist. Check bag.")
		  }
		  else{
			  let body = { "personalizations": [ { "to": [ { "email": String(JSON.parse(event.data)['email']) } ], "subject": "Your Luggage from " + JSON.parse(this.state.full_json)['origin'] + " to " + JSON.parse(this.state.full_json)['destination']  } ], "from": { "email": "slide@slide.com" }, "content": [ { "type": "text/plain", "value": "Hello " + responseJson['firstName'] + ", \n Your luggage just got scanned into " +  this.state.location + ". \n If this seems suspicious, please contact your nearest flight attendant/help desk if you are at the gate. \n Thanks and safe travels, \n The Slide Team."} ] }
			  fetch('https://api.sendgrid.com/v3/mail/send', {
				  method: 'POST',
				  headers: {
					'Authorization': 'Bearer ' + API.API.SG_Key,
					'Content-Type': 'application/json',
				  },
				  body: JSON.stringify(body),
				}).then((response) => {
				  Toast.show("Email has been sent.")
				});
			  Toast.show("Data successfully scanned")
		  }
		  this.setState({visible: false})
	 })

	}

  }

  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'row',
	},
	preview: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  alignItems: 'center'
	},
	welcome: {
	  fontSize: 25,
	  margin: 10,
	},
	capture: {
	  flex: 0,
	  backgroundColor: '#fff',
	  borderRadius: 5,
	  color: '#000',
	  padding: 10,
	  margin: 40
	}
  });
