import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import topBar from '../images/center-logo2x.png'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  CheckBox,
  Button
} from 'react-native-elements'
import axios from 'axios'

let geolocationCoordinates = []

export default class BathRoomForm extends Component<{}> {
  constructor() {
    super()

    this.state = {
        location_name: 'anson',
        latitude: 69,
        longitude: 69,
        over_21: false,
        handicapped: false,
        family: false,
        customer_only: false
    }
  }

  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    headerBackTitleStyle: {
        opacity: 0,
    },
    headerTintColor: '#fff'
  };



  updateLocationName(locationName) {
    console.log(this.state.location_name)
    this.setState({ location_name: locationName  });
  }

  updateAddress(address) {
    this.setState({ address: address  });
  }

  toggleOver21() {
    if (this.state.over_21 === false) {
      this.setState({ over_21: true })
    } else {
      this.setState({ over_21: false })
    }
  }

  toggleHandicapped() {
    if (this.state.handicapped === false) {
      this.setState({ handicapped: true })
    } else {
      this.setState({ handicapped: false })
    }
  }

  toggleFamily() {
    if (this.state.family === false) {
      this.setState({ family: true })
    } else {
      this.setState({ family: false })
    }
  }

  toggleCustomerOnly() {
    if (this.state.customer_only === false) {
      this.setState({ customer_only: true })
    } else {
      this.setState({ customer_only: false })
    }
  }

  geolocateAddress(address) {
    console.log('making post to google')

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDvzsWpabMDZzoKw5hpo5RODzQhqzE4dhg&address=${address}`)
    .then(response => {
      geolocationLat = response.data.results[0].geometry.location.lat
      geolocationLng = response.data.results[0].geometry.location.lng
      return geolocationCoordinates = [geolocationLat, geolocationLng]
    });
  }

  addBathroom(bathroomData) {
    // console.log('printing bathroomData:')
    // console.log(bathroomData)
    var addressCoordinates = this.geolocateAddress('dev bootcamp sf')



    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:3000/bathrooms/',  bathroomData)
    .then(response => {
      console.log('printing google API response:')
      console.log(geolocationCoordinates)
      // console.log('printing backend response:')
      // console.log(response)
    });
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Image
          source={topBar}
          style={styles.topBar}
        />

        <FormLabel>Business Name</FormLabel>
        <FormInput onChangeText={(locationName) => this.updateLocationName(locationName)}/>
        <FormValidationMessage>Error message</FormValidationMessage>

        <FormLabel>Address</FormLabel>
        <FormInput onChangeText={(address) => this.updateAddress(address)}/>

        <CheckBox
          title='21+'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.over_21}
          onPress={() => this.toggleOver21()}
        />

        <CheckBox
          title='Handicap accessible'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.handicapped}
          onPress={() => this.toggleHandicapped()}
        />

        <CheckBox
          title='Family'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.family}
          onPress={() => this.toggleFamily()}
        />

        <CheckBox
          title='Customer-only'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.customer_only}
          onPress={() => this.toggleCustomerOnly()}
        />

        <Button
          raised
          backgroundColor='#007fff'
          buttonStyle={{ marginTop: 10, marginBottom: 20 }}
          icon={{ name: 'add'}}
          title='Add Bathroom'
          onPress={() => this.addBathroom(this.state)}
         />

      </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  topBar: {
    height: 67,
    width: 375,

  }
});
