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
import {Volunteer} from './volunteer'

import {Default} from './Default'
import API from '../config/api.json'

export class Entry extends Component {
  static navigationOptions =({navigation}) => ({
	title: 'Welcome',
	headerRight: <Button title="Settings" onPress ={() => navigation.navigate('Settings')}/>
  });
  constructor(props){
	super(props)
  }



  render() {
	const { navigate } = this.props.navigation;
	return (
	  <View style = {styles.container}>
	  <Image source={require('../images.jpeg')} style = {styles.image} />
	  <Default navigation = {this.props.navigation} />
	  </View>

	)
  }
}


const styles = StyleSheet.create({
  image: {
	height: '40%',
	width: '75%',
	resizeMode: "contain",
	backgroundColor: '#F5FCFF',
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
  },
});
