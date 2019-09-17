import React, {
 Component,
} from 'react';
// import PropTypes from 'prop-types';
import {
 connect,
} from 'react-redux';
import {
 View,
} from 'react-native';

class Notifications extends Component {
  componentDidMount() {}

  render() {
    return <View />;
  }
}
Notifications.propTypes = {};

// const styles = StyleSheet.create({});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
