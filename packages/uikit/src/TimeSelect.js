import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Colors, Fonts } from 'themes';
import { showLightBox } from 'navigation/navigationActions';
import Text from './Text';
import SelectionButton from './SelectionButton';

const TimeSelect = ({ title, onChange, data }) => {
  const showTimePicker = (index, key) => () => {
    const onChangeData = e => {
      const newData = data;
      newData[index][key] = moment(e).format('HH:mm');
      onChange([...newData]);
    };

    showLightBox('DatePicker', {
      passProps: {
        mode: 'time',
        onClose: date => onChangeData(date),
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title} color={Colors.iconNav} type="body1SemiBold">
        {title}
      </Text>
      <View style={styles.vRight}>
        <View style={styles.row}>
          <SelectionButton
            onPress={showTimePicker(0, 'start')}
            style={styles.selectButton}
            value={data[0]?.start}
          />
          <Text type="body1" style={styles.divider}>
            -
          </Text>
          <SelectionButton
            onPress={showTimePicker(0, 'end')}
            style={styles.selectButton}
            value={data[0]?.end}
          />
        </View>
        <View style={styles.row}>
          <SelectionButton
            onPress={showTimePicker(1, 'start')}
            style={styles.selectButton}
            value={data[1]?.start}
          />
          <Text style={styles.divider}>-</Text>
          <SelectionButton
            onPress={showTimePicker(1, 'end')}
            style={styles.selectButton}
            value={data[1]?.end}
          />
        </View>
      </View>
    </View>
  );
};
TimeSelect.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectButton: {
    marginTop: 0,
    width: 90,
  },
  vRight: {
    flex: 2,
  },
  divider: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.semibold,
  },
});

export default TimeSelect;
