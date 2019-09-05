import React, {
 Component,
} from 'react';
import PropTypes from 'prop-types';
import {
 Text, Animated, TouchableHighlight, StyleSheet,
} from 'react-native';
import {
 Colors,
} from '../themes/index';

export default class ChipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressButton() {
    const { onPress, data } = this.props;
    onPress && onPress(data);
  }

  render() {
    const { onPress, text, cancel } = this.props;
    return (
      <TouchableHighlight style={[styles.container]} underlayColor="transparent" onPress={onPress}>
        <Animated.View collapsible={false} style={styles.chipContent}>
          <Text style={styles.text}>{text}</Text>
          <Text style={[styles.text, { marginLeft: 10 }]} onPress={cancel}>
            X
          </Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}

ChipCard.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  cancel: PropTypes.func,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    padding: 5,
    marginVertical: 5,
    marginLeft: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 15,
    paddingRight: 8,
  },
  chipContent: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  icon: {
    color: '#CCCCCC',
  },
});
