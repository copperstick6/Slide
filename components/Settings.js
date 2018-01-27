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
  Image,
  TextInput
} from 'react-native';
import Toast from 'react-native-simple-toast'
import {NavigationActions} from 'react-navigation'
import DatePicker from 'react-native-datepicker'
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../config/api.json'


export class Settings extends Component {
  static navigationOptions = {
	title: 'Settings',
	mode: 'modal'
  };
  constructor(props){
	super(props)
	this.state = {
	  text: null,
	  date: null,
	  cur_date: null,
	  visible: true
	};
	this.saveEmail = this.saveEmail.bind(this)
  }

  saveEmail(){
	  this.setState({visible: true})
	  console.log(String(API.API.AA) + "flight?date=" + String(this.state.cur_date) + "&flightNumber=" + String(this.state.text))
	 fetch(String(API.API.AA) + "flight?date=" + String(this.state.cur_date) + "&flightNumber=" + String(this.state.text))
	  .then(response => response.json())
	  .then(responseJson => {
		console.log(String(JSON.stringify(responseJson)))
		if(responseJson['error'] == "Flight could not be found"){
			Toast.show("Error with input: " + responseJson['error'])
			AsyncStorage.setItem("fd_json", null)
		}
		else{
			Toast.show("Flight Details Successfully Retrieved.")
			AsyncStorage.setItem("flight_number", this.state.text)
			AsyncStorage.setItem("flight_date", this.state.date)
			AsyncStorage.setItem("fd_json", JSON.stringify(responseJson))
			const {navigate} = this.props.navigation
			navigate("Home")
		}
		this.setState({visible: false})
	})
  }
  componentWillMount(){

	var moment = require('moment');
	  AsyncStorage.multiGet(["flight_number", "flight_date"], (err, stores) => {
		stores.map((result, i, store) => {
			console.log("Store 0: " + store[0][1] + " Store 1: " + store[1][1])
		  if(store[0][1] != null)
			  this.setState({text: store[0][1]})

		  if(store[1][1] != null)
				this.setState({date: store[1][1]})
		});
		current_date = String(moment().year()) + "-" + (parseInt(moment().month()) + 1) + "-" + String(moment().dates())
		this.setState({ cur_date: current_date, visible: false })
	  });
  }

  render() {
	return (
	  <View style = {styles.container}>
	  <Spinner visible={this.state.visible}>
			</Spinner>
	  <Text style={styles.welcome}>
	  Flight Number
	  </Text>
	  <TextInput
		style={{height: 40, width:300}}
		onChangeText={(text) => this.setState({text})}
		value={this.state.text}
	  />
	  <Text>{"\n"}</Text>
	  <Text style={styles.welcome}>
	  Flight Date
	  </Text>
	  <Text>{"\n"}</Text>
	  <DatePicker
		  style={{width: 200}}
		  date={this.state.date}
		  mode="date"
		  placeholder="select date"
		  format="YYYY-MM-DD"
		  minDate={this.state.cur_date}
		  confirmBtnText="Confirm"
		  cancelBtnText="Cancel"
		  customStyles={{
			dateIcon: {
			  position: 'absolute',
			  left: 0,
			  top: 4,
			  marginLeft: 0
			},
			dateInput: {
			  marginLeft: 36
			}
	  }}
	  onDateChange={(date) => {this.setState({date: date})}}
		/>
		<Text>{"\n"}</Text>
	  <Button onPress={this.saveEmail} title="Next"></Button>
	  </View>
	)
  }
}


const styles = StyleSheet.create({
  container: {
	flex: 3,
	justifyContent: 'flex-start',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  welcome: {
	marginTop: 50,
	fontSize: 25,
	textAlignVertical: 'top'
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
