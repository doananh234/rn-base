import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../themes';
import PopupWrapper from '../../components/Popup/PopupWrapper';
import DatePicker from '../../ui/DatePicker';
// import { dismissLightBox } from '../../navigation/navigationActions';

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
    // dismissLightBox(componentId);
  };

  render() {
    return (
      <PopupWrapper
        showCloseButton={false}
        contentStyle={styles.innerRowContainer}
        onClose={this.onClose}
      >
        <DatePicker onClose={this.onClose} onDateChange={this.onDateChange} />
      </PopupWrapper>
    );
  }
}

DatePickerUI.propTypes = {
  componentId: PropTypes.string,
  onClose: PropTypes.func,
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: Colors.blur1,
  },
  innerRowContainer: {
    padding: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    height: Platform.OS === 'ios' ? 230 : 0,
  },
  vRow: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSpace: {
    height: 70,
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
    backgroundColor: Colors.default,
  },
});
