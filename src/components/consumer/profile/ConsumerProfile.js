import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Label, Text, Header, Body, Title, Button} from 'native-base';
import {connect} from 'react-redux';
import {getUser} from '../../../actions/UserActions';

class ConsumerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.props.getUser();
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
          <View style={styles.userInfo}>
            <Label>Name</Label>
            <Text> {this.state.user.name} </Text>
          </View>
          <View style={styles.userInfo}>
            <Label>Mobile</Label>
            <Text> {this.state.user.mobileNumber} </Text>
          </View>
          <View style={styles.userInfo}>
            <Label>Address</Label>
            <Text> {this.state.user.address} </Text>
          </View>
        </View>
        <Button
          style={styles.actions}
          onPress={() => {
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
  userInfo: {
    top: 20,
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: {
    top: 50,
    alignSelf: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerProfile);
