import React from 'react';
import { View, Text, Button } from 'react-native';
import { pop } from 'navigation/navigationActions';

function Modal() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => pop()} title="Dismiss" />
    </View>
  );
}

export default React.memo(Modal);
