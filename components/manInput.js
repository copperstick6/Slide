import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export class ManualInput extends Component {
  static navigationOptions = {
	title: 'Manual Input',
  };
  constructor(props) {
	super(props);
	this.state = { full_json: '', visible: true };
  }

  componentWillMount(){
	  AsyncStorage.getItem("fd_json").then(function(value){
	  this.setState({full_json: value, visible: false})
	}.bind(this))
  }
  render() {
	  let deets = null
	  let button = null

	  if(!this.state.visible){
		  json_data = JSON.parse(this.state.full_json)
		  deets = <Text style = {styles.welcome}>Flight Number: {json_data['flightNumber']} {"\n"} Flight going from {json_data['origin']} to {json_data['destination']} {"\n"}Flight time is {json_data['departureTime']} to {json_data['arrivalTime']}. {"\n"} Flight is currently {json_data['flightStatus']}</Text>
		  button = <Button onPress={() => this.props.navigation.navigate('Home')} title="Back"></Button>
	  }
	return (
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible}>
			</Spinner>
	  {deets}
	  {button}
	  </View>

	);
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
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
