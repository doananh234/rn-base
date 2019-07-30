import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

class Calendar extends Component {
  render() {
    return <View />;
  }
}
Calendar.propTypes = {};

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
