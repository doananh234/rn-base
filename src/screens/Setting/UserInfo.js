/* eslint-disable camelcase */
import React from 'react';
import I18n from 'i18n-js';
import {
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../themes';
import Text from '../../components/Text';
// import Avatar from '../../components/Avatar';

const UserInfo = ({ user, onPress }) => {
  const { first_name, last_name, avatar } = user;
  return (
    <TouchableHighlight underlayColor="transparent" onPress={() => onPress()}>
      <View style={styles.content}>
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : Images.defaultUser}
        />
        <View style={styles.vRight}>
          <Text type="headline" color={Colors.primaryText}>
            {first_name ? `${first_name} ${last_name}` : 'Guest'}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
};

const { width } = Dimensions.get('window');
const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 38 : 13,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  vRight: {
    flex: 1,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  status: {
    paddingTop: 5,
  },
};

export default UserInfo;
