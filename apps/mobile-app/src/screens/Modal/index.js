import React from 'react';
import {
 View, Text, Button,
} from 'react-native';
import {
 useNavigation,
} from 'react-navigation-hooks';

function Modal() {
  const { goBack } = useNavigation;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => goBack()} title="Dismiss" />
    </View>
  );
}

export default React.memo(Modal);
