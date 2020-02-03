import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { Colors } from 'themes';
import { ScrollView } from 'react-native-gesture-handler';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: props.initialPage };
  }

  onChangeIndex = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex } = this.state;
    const { data, style } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        style={[styles.row, style]}
      >
        {data.map((e, index) => (
          <View
            key={String(index)}
            style={[styles.item, currentIndex === index && styles.current]}
          />
        ))}
      </ScrollView>
    );
  }
}

Pagination.propTypes = {
  data: PropTypes.array,
  style: PropTypes.any,
  initialPage: PropTypes.number,
};

Pagination.defaultProps = {
  initialPage: 10,
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginHorizontal: 15,
    flex: -1,
    flexShrink: -1,
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,
  },
  item: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6A6A6A',
    margin: 2,
  },
  current: {
    backgroundColor: Colors.primary,
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: Colors.default,
    borderWidth: 1,
  },
});

export default Pagination;
