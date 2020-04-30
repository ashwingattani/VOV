import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Text, Header, Body, Title, Button} from 'native-base';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

class ConsumerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user) {
      return {user: nextProps.user};
    } else return null;
  }

  render() {
    return (
      <SafeAreaView>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <View style={styles.userInfoContainer}>
          <View style={styles.personalDetails}>
            <View style={styles.userInfo}>
              <Text> {this.state.user.name} </Text>
            </View>
            <View style={styles.userInfo}>
              <Text> {this.state.user.mobileNumber} </Text>
            </View>
          </View>
          <View style={styles.addressDetails}>
            <View style={styles.userInfo}>
              <Text> {this.state.user.address.houseNumber} </Text>
              <Text> {this.state.user.address.houseName} </Text>
            </View>
            <View style={styles.userInfo}>
              <Text> {this.state.user.address.street} </Text>
              <Text> {this.state.user.address.pincode} </Text>
            </View>
          </View>
        </View>
        <Button
          style={styles.actions}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(function () {})
              .catch(function (error) {
                // An error happened.
                console.log(error);
              });

            this.props.navigation.navigate('Login');
          }}>
          <Text> Logout </Text>
        </Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  personalDetails: {
    fontWeight: '900',
  },
  addressDetails: {
    top: 20,
  },
  userInfo: {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  actions: {
    top: 100,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
  };
};

export default connect(mapStateToProps, null)(ConsumerProfile);
