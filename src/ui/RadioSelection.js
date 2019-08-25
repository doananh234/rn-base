import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 View, Text, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';

const Radio = ({ selected, text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.row}>
        <Icon style={styles.icon} name={selected ? 'md-radio-button-on' : 'md-radio-button-off'} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Radio.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

class RadiosGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.initSelected,
    };
  }

  onChange = e => {
    const { onChange } = this.props;
    this.setState({ selected: e });
    onChange && onChange(e);
  };

  render() {
    const { data } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <Radio
            key={Number(index)}
            onPress={() => this.onChange(index)}
            selected={index === selected}
            {...item}
          />
        ))}
      </View>
    );
  }
}

RadiosGroup.propTypes = {
  data: PropTypes.any,
  initSelected: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontWeight: '200',
    fontSize: 17,
    color: Colors.primaryText,
  },
  text: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },
});

export default RadiosGroup;
