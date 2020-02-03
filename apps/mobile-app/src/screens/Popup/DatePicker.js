import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, Platform} from 'react-native';
import PopupWrapper from '@components/Popup/PopupWrapper';
import {Colors} from 'themes';
import DatePicker from 'uikit/src/DatePicker';
// import { dismissLightBox } from '../../navigation/navigationActions';

export default class DatePickerUI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDateChange = date => {
    console.log('date', date);
    this.selectedDate = date;
  };

  onClose = () => {
    const {componentId, onClose} = this.props;
    onClose(this.selectedDate?.iso);
    // dismissLightBox(componentId);
  };

  render() {
    return (
      <PopupWrapper
        showCloseButton={false}
        contentStyle={styles.innerRowContainer}
        onClose={this.onClose}>
        <DatePicker onClose={this.onClose} onDateChange={this.onDateChange} />
      </PopupWrapper>
    );
  }
}

DatePickerUI.propTypes = {
  componentId: PropTypes.string,
  onClose: PropTypes.func,
};

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
