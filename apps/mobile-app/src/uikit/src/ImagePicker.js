import React, { Component } from 'react';
import { View, Image, Keyboard, StyleSheet } from 'react-native';
import { xorBy } from 'lodash';
import I18n from 'i18n-js';
import ImageCropPicker from 'react-native-image-crop-picker';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Navigation } from 'react-native-navigation';
import { Colors } from 'themes';
import Tools from 'utils/tools';
import Button from './Button';
import ButtonSquare from './ButtonSquare';

const formatImagePickerData = image => ({
  type: image.mineType || image.mime,
  filename: image.sourceURL || image.path,
  name: image.filename || image.path,
  uri: image.path,
});

export default class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: [],
    };
  }

  getPhotoSelected = () => this.state.imgArr;

  selectPhoto = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      ImageCropPicker.openPicker({
        multiple: true,
        maxFiles: 4,
      })
        .then(images => {
          this.setState({
            imgArr: xorBy(
              images.map(image => formatImagePickerData(image)),
              this.state.imgArr,
              'filename',
            ).splice(0, 4),
          });
        })
        .catch(() => {
          Tools.showGoToSettingPopUp(() => {}, I18n.t('titleDialogPhoto'));
        });
    }, 350);
  };

  removePhoto = item => {
    this.setState({ imgArr: xorBy(this.state.imgArr, [item], 'filename') });
  };

  render() {
    const { imgArr } = this.state;
    return (
      <View style={styles.row}>
        {imgArr.map(item => (
          <View key={item.name} style={[styles.vImageItem]}>
            <Image style={styles.vImageItem} source={{ uri: item.uri }} />
            <Button
              ionicons="ios-close"
              onPress={() => this.removePhoto(item)}
              style={styles.btnClose}
              wrapperStyle={styles.btnPosition}
              iconStyle={{
                marginRight: 0,
                color: Colors.primaryText,
                fontSize: 17,
              }}
            />
          </View>
        ))}
        <ButtonSquare
          onPress={this.selectPhoto}
          btnStyle={styles.vImageItem}
          size={20}
          ionicon="ios-image"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vImageItem: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btnPosition: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
  },
  btnClose: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: Colors.gray,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.default,
    zIndex: 1,
  },
});
