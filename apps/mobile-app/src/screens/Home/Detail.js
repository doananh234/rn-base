import React from 'react';
import { View, Text } from 'react-native';

function Detail() {
  const value = '';
  const title = '';

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export default React.memo(Detail);
