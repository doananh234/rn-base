import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from 'themes';
import {safeArea} from '../../utils/Devices';
import PopupWrapper from '../../components/Popup/PopupWrapper';
import Text from 'uikit/src/Text';

export default class PopupItemEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const {data} = this.props;
    this.setState({
      height: data.length * 58 + safeArea().paddingBottom,
    });
  }

  renderRow = data => {
    const {textProp, componentId, onPress} = this.props;
    return (
      <TouchableOpacity
        key={data.id}
        underlayColor="transparent"
        onPress={() => onPress(data, componentId)}>
        <View style={styles.vRow}>
          <Text style={[styles.txt, data.color && {color: data.color}]}>
            {data[textProp]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {data, componentId, onClose} = this.props;
    const {height} = this.state;
    return (
      <PopupWrapper
        showCloseButton={false}
        contentStyle={[styles.innerRowContainer, {height}]}
        onClose={() => onClose(componentId)}>
        <View style={styles.footerSpace} />
        {data.map(item => {
          return this.renderRow(item);
        })}
      </PopupWrapper>
    );
  }
}

PopupItemEvent.propTypes = {
  textProp: PropTypes.string,
  componentId: PropTypes.string,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  innerRowContainer: {
    padding: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
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
