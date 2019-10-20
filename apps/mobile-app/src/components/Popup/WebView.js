import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, WebView, StyleSheet} from 'react-native';
import ProgressScreen from '../ProgressScreen';
import Container from '../Container';
import {safeArea} from '../../utils/Devices';

class WebViewUI extends Component {
  state = {
    isLoad: false,
  };

  onLoadStart = () => {
    this.setState({isLoad: true});
  };

  onLoadEnd = () => {
    this.setState({isLoad: false});
  };

  render() {
    const {uri} = this.props;
    const {isLoad} = this.state;
    return (
      <Container>
        <WebView
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          source={{uri}}
          style={styles.container}
        />
        {isLoad && (
          <View style={styles.loadingView}>
            <ProgressScreen isFullScreen={false} />
          </View>
        )}
      </Container>
    );
  }
}
WebViewUI.propTypes = {
  uri: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingView: {
    position: 'absolute',
    top: safeArea().navHeight,
    left: 0,
    right: 0,
    height: 200,
  },
});

export default WebViewUI;
