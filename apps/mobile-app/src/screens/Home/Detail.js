import React from 'react';
import {View, Text} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';

function Detail() {
  const value = useNavigationParam('value');
  const title = useNavigationParam('title');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export default React.memo(Detail);
