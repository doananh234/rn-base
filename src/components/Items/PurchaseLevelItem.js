import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';

const SUBSCRIPTION_PERIOD = {
  P1W: 'Week',
  P1M: 'Month',
  P1Y: 'Year',
};

const getSubscriptionTrialPeriodDay = product => {
  return product.subscriptionFreeTrialPeriod.replace('P', '').replace('D', '');
};

const PurchaseLevelItem = ({
 item, onPress, isSelected, index,
}) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.container,
          isSelected && styles.shadow,
          index === 0 && { marginLeft: 30 },
          index === 2 && { marginRight: 30 },
        ]}
      >
        {isSelected && (
          <LinearGradient
            colors={['rgb(159,172,230)', 'rgb(116,235,213)']}
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 1 }}
            locations={[0, 1]}
            style={styles.selected}
          />
        )}
        <Text color={isSelected ? Colors.default : Colors.primaryText}>
          {item.title.replace(
            ' Subscription (Learn Language By Conversation)',
            '',
          )}
        </Text>
        <Text color={isSelected ? Colors.default : Colors.primaryText}>
          Free trial
          {' '}
          {getSubscriptionTrialPeriodDay(item)}
          {' '}
days
        </Text>
        <View style={{ flex: 1 }} />
        <Text color={isSelected ? Colors.default : Colors.primaryText}>
          After trial, then
          {' '}
          <Text color={isSelected ? Colors.default : Colors.primaryText}>
            {item.priceText}
          </Text>
          /
          {`${SUBSCRIPTION_PERIOD[item.subscriptionPeriod]}`}
        </Text>
      </View>
    </Touchable>
  );
};

PurchaseLevelItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginHorizontal: 10,
    borderRadius: 14,
    backgroundColor: '#efefef',
    marginTop: 15,
    width: 140,
    height: 140,
    padding: 10,
  },
  selected: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 8,
  },
});

export default PurchaseLevelItem;
