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

class Settings extends Component {
  componentDidMount() {}

  render() {
    return <View />;
  }
}
Settings.propTypes = {};

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
)(Settings);
