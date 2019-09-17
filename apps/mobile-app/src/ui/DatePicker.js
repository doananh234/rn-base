import React, {
 Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  DatePickerIOS,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Date().getTimezoneOffset(),
      date: props.date ? moment(props.date).toDate() : moment().toDate(),
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
  }

  componentDidMount() {
    Platform.OS === 'android' && this.showPicker();
  }

  componentWillUnmount() {}

  onChange(data) {
    this.setState({ ...data });
  }

  showPicker = async () => {
    const { mode, minuteInterval, onClose } = this.props;
    const { date, minDate, maxDate } = this.state;
    if (mode === 'time') {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          const data = {
            hour,
            minute: (Number(minute) / minuteInterval) * minuteInterval,
          };
          this.onDateChange(data);
          onClose && onClose();
        } else {
          this.onClose = this.onClose.bind(this);
        }
      } catch ({ code, message }) {
        onClose && onClose();
        console.warn('Cannot open time picker', message);
      }
    } else {
      try {
        const {
 action, year, month, day,
} = await DatePickerAndroid.open({
          date,
          minDate,
          maxDate,
        });
        if (action === DatePickerAndroid.dismissedAction) {
          onClose && onClose();
        } else {
          console.log('');
          const converDate = {
            year,
            month,
            day,
            iso: moment(`${month + 1}/${day}/${year}`, 'MM/D/YYYY').toString(),
          };
          // newState[stateKey + 'Text'] = date.toLocaleDateString();
          // newState[stateKey + 'Date'] = date;
          this.onDateChange(converDate);
          onClose && onClose();
        }
        // this.setState(newState);
      } catch ({ code, message }) {
        // console.warn(`Error in example '${stateKey}': `, message);
      }
    }
  };

  renderDatePicker = () => {
    const {
 onClose, minuteInterval, mode, minDate, maxDate,
} = this.props;
    const { date } = this.state;
    return (
      <View>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={onClose}
          style={styles.blur}
        >
          <View />
        </TouchableHighlight>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS
            minuteInterval={minuteInterval}
            style={styles.datePicker}
            mode={mode || 'date'}
            minimumDate={minDate}
            maximumDate={maxDate}
            onDateChange={this.onDateChange}
            date={date}
          />
        ) : (
          <DatePickerAndroid />
        )}
      </View>
    );
  };

  onDateChange = date => {
    const { onDateChange, minuteInterval } = this.props;
    const { offset } = this.state;
    this.setState({ date });
    let data = {};
    if (Platform.OS === 'android') {
      data = date;
    } else {
      data = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute:
          Math.floor(Number(date.getMinutes()) / minuteInterval)
          * minuteInterval,
        offset,
        iso: date.toString(),
      };
    }
    onDateChange && onDateChange(data);
  };

  render() {
    return Platform.OS === 'ios' ? this.renderDatePicker() : <View />;
  }
}

DatePicker.propTypes = {
  date: PropTypes.string,
  minuteInterval: PropTypes.number,
  onDateChange: PropTypes.func,
  onClose: PropTypes.func,
  mode: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
};

const styles = StyleSheet.create({
  datePicker: {
    height: 300,
  },
  blur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
