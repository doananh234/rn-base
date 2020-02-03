import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const Section = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} type="titleSemiBold">
        {title}
      </Text>
      {children}
    </View>
  );
};
Section.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 5,
    marginLeft: 20,
  },
});

export default Section;
