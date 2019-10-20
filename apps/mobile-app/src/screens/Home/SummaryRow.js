import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import SummaryItem from '../../components/Items/SummaryItem';
import {Colors} from '../../themes';

const SummaryRow = ({summaries}) => {
  const SUMMARIES = [
    {
      icon: 'ic-all-member',
      key: 'totalMembers',
      value: summaries?.memberCount,
      title: I18n.t('summary.totalMembers'),
      backgroundColor: Colors.blue,
    },
    {
      icon: 'ic-logo',
      key: 'alreadyBloodDonation',
      value: summaries?.readyBloodCount,
      title: I18n.t('summary.alreadyBloodDonation'),
      backgroundColor: Colors.green,
    },
    {
      icon: 'ic-rare-blood',
      key: 'rareBloodType',
      value: summaries?.rareBloodCount,
      title: I18n.t('summary.rareBloodType'),
      backgroundColor: Colors.orange,
    },
    {
      icon: 'ic-blood',
      key: 'bloodDonations',
      value: summaries?.donateCount,
      title: I18n.t('summary.bloodDonations'),
      backgroundColor: Colors.pink,
    },
  ];
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingRight: 20}}
      horizontal
      style={styles.summaryRow}>
      {SUMMARIES.map(data => (
        <SummaryItem style={styles.summaryItem} key={data.key} {...data} />
      ))}
    </ScrollView>
  );
};
SummaryRow.propTypes = {
  summaries: PropTypes.object,
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  summaryRow: {
    paddingHorizontal: 20,
    paddingTop: 10,
    height: (width - 40) / 3 + 30,
    flexGrow: 0,
    flexShrink: 0,
    overflow: 'visible',
  },
  summaryItem: {
    width: (width - 40) / 3,
    height: (width - 40) / 3,
    marginTop: 10,
    marginRight: 20,
  },
});

export default SummaryRow;
