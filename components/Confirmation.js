
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Platform,
  BackAndroid,
  BackHandler,
  AsyncStorage,
  TextInput
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import API from '../config/api.json'

export class Confirmation extends React.Component {
  constructor(props){
	super(props)
	this.backPress = this.backPress.bind(this)
	this.rescan = this.rescan.bind(this)
	this.sendCode = this.sendCode.bind(this)
  }
  static navigationOptions = {
	title: 'Confirmation',
	headerLeft: null,
  };
  componentDidMount(){
	if(!(Platform.OS === 'ios')){
		BackHandler.addEventListener('hardwareBackPress', this.backPress);
	}
  }
  componentWillUnmount() {
	if(!(Platform.OS === 'ios')){
		BackHandler.removeEventListener('hardwareBackPress', this.backPress);
	}
  }
  componentWillMount(){

  }

  backPress() {
	this.props.navigation.state.params.resetState()
  }
  rescan(){
	  this.props.navigation.state.params.resetState()
	  this.props.navigation.dispatch(NavigationActions.back())
  }
  sendCode(){
  }

  render(){


	return(
	  <View style={styles.container}>

	  <Text>{"\n"}</Text>
	  </View>
	)
  }
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  welcome: {
	fontSize: 20,
	textAlign: 'center',
	margin: 10,
  },
  button: {
	margin: 20,
	marginBottom: 5
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
