import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
// import LottieView from 'lottie-react-native';
// import loading from '../assets/loading.json';
import {Colors} from 'themes';

class ProgressScreen extends Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
    // const { onDisplay, componentId } = props;
    // onDisplay && onDisplay(componentId);
  }

  componentDidMount() {
    this.loading.play();
  }

  componentWillUnmount() {
    this.loading.reset();
  }

  render() {
    const {isFullScreen} = this.props;
    return (
      <View style={[styles.vProgress, isFullScreen && styles.vFullScreen]}>
        {/* <LottieView
          ref={ref => {
            this.loading = ref;
          }}
          source={loading}
          loop
          style={styles.vAnimation}
        /> */}
      </View>
    );
  }
}

ProgressScreen.propTypes = {
  isFullScreen: PropTypes.bool,
  onDisplay: PropTypes.func,
  // componentId: PropTypes.string,
};

ProgressScreen.defaultProps = {
  isFullScreen: true,
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  vProgress: {
    width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  vFullScreen: {
    height,
    backgroundColor: Colors.blur0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressScreen;
