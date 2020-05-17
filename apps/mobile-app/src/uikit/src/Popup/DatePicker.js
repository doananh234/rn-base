import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import { dismissLightBox } from 'navigation/navigationActions';
import PopupWrapper from './PopupWrapper';
import DatePicker from '../DatePicker';

export default class DatePickerUI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDateChange = date => {
    this.selectedDate = date;
  };

  onClose = () => {
    const { componentId, onClose } = this.props;
    onClose(this.selectedDate?.iso);
    dismissLightBox(componentId);
  };

  render() {
    return (
      <PopupWrapper
        showCloseButton={false}
        contentStyle={styles.innerRowContainer}
        onClose={this.onClose}
      >
        <DatePicker
          mode={this.props.mode}
          onClose={this.onClose}
          onDateChange={this.onDateChange}
        />
      </PopupWrapper>
    );
  }
}

DatePickerUI.propTypes = {
  componentId: PropTypes.string,
  onClose: PropTypes.func,
  mode: PropTypes.string,
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  innerRowContainer: {
    padding: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    height: Platform.OS === 'ios' ? 230 : 0,
  },
});
