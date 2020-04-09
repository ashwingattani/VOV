import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Label, Text, Header, Body, Title} from 'native-base';
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
        <View>
          <Label>Name</Label>
          <Text> {this.state.user.name} </Text>
        </View>
        <View>
          <Label>Mobile</Label>
          <Text> {this.state.user.mobileNumber} </Text>
        </View>
        <View>
          <Label>Address</Label>
          <Text> {this.state.user.address} </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerProfile);
