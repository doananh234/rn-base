import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/mealplanner';
import {Images, Colors} from '../themes/index';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: props.image ? {uri: props.image} : null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {image} = this.props;
    if (image !== newProps.image) {
      this.setState({
        avatarSource: newProps.image ? {uri: newProps.image} : null,
      });
    }
  }

  selectPhotoTapped = () => {
    const {disableSelect} = this.props;
    if (disableSelect) {
      return;
    }
    const options = {
      quality: 1.0,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      const {setImage} = this.props;
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }
        setImage && setImage(source);

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const {style, circle} = this.props;
    const {avatarSource} = this.state;
    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback
          style={[styles.avatar, circle && styles.circle]}
          underlayColor="white"
          onPress={this.selectPhotoTapped}>
          <View style={[styles.avatarContainer]}>
            <Icon name="camera" size={15} style={styles.icon} />
            <Image
              onError={() => {
                this.setState({avatarSource: null});
              }}
              style={[styles.avatar, circle && styles.circle]}
              // defaultSource={Images.defaultUser}
              source={avatarSource || Images.primary}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Avatar.propTypes = {
  style: PropTypes.any,
  circle: PropTypes.bool,
  disableSelect: PropTypes.bool,
  setImage: PropTypes.func,
  image: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
  },
  avatarContainer: {
    backgroundColor: Colors.grayBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: Colors.secondary,
    backgroundColor: 'transparent',
    position: 'absolute',
    fontSize: 30,
  },
  circle: {borderRadius: 40},
});
