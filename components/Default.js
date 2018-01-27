import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Linking,
  Button,
  AsyncStorage,
  Image
} from 'react-native';
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay';

export class Default extends Component {
  static navigationOptions = {
	title: 'Welcome',
  };
  constructor(props){
	super(props)
	this.state = {
		flight: false,
		visible: false
	}
	this.navigateQR = this.navigateQR.bind(this)
	this.navigateManual = this.navigateManual.bind(this)
  }
  navigateQR(){
	  if(!this.state.flight){
		  Toast.show("Please enter a valid flight and time via Settings")
	  }
	  else{
		  const {navigate} = this.props.navigation
		  navigate("QrCamera")
	  }

  }
  navigateManual(){
	const {navigate} = this.props.navigation
	navigate("Manual")
  }
  componentWillMount(){
	  AsyncStorage.getItem("fd_json").then(function(value){
	  console.log(value)
	  if(!(value === null)){
		this.setState({flight: true})
	  }
	  this.setState({visible: false})
	}.bind(this))
  }


  render() {
	 let flight_details  = null
	 if(this.state.flight){
		 flight_details = <Button onPress={this.navigateManual} title="Flight Details">Navigate</Button>
	 }
	return (
	  <View style = {styles.container}>
	  <Spinner visible={this.state.visible}>
			</Spinner>
	  <Text style={styles.welcome}>
	  Hi, Welcome to Slide
	  </Text>
	  <Text>{"\n"}</Text>
	  <Text style = {styles.instructions}>
	  To start autoscanning packages, press the button below.
	  </Text>
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  <Button onPress={this.navigateQR} title="Camera">Navigate</Button>
	  <Text>{"\n"}</Text>
	  <Text>{"\n"}</Text>
	  {flight_details}
	  </View>
	)
  }
}


const styles = StyleSheet.create({
  image: {
	height: '40%',
	width: '75%',
	resizeMode: "contain"
  },
  container: {
	flex: 3,
	justifyContent: 'flex-start',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  button: {
	marginRight: 10,
  },
  welcome: {
	fontSize: 25,
	margin: 10,
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
	fontSize: 15,
  },
});
