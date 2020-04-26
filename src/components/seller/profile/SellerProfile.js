import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Body, Title, Text, Button, Switch} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {updateUser} from '../../../actions/UserActions';
class SellerProfile extends React.Component {
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

  updateUserStatus = (value) => {
    let updatedUser = this.state.user;
    updatedUser.isOnline = value;
    this.setState({user: updateUser}, () => {
      this.props.updateUser(updatedUser);
    });
  };

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
              <Text> {this.state.user.address.houseName} </Text>
            </View>
            <View style={styles.userInfo}>
              <Text> {this.state.user.address.pincode} </Text>
            </View>
          </View>
        </View>
        <Button
          style={styles.actions}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text> Logout </Text>
        </Button>
        <View style={styles.switch}>
          <Text>Online</Text>
          <Switch
            value={this.state.user.isOnline}
            onValueChange={this.updateUserStatus}
          />
        </View>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
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
  switch: {
    flexDirection: 'row',
    top: 20,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    error: state.user.error,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
