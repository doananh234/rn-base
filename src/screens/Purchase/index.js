import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
// import InAppBilling from 'react-native-billing';
import {
 ScrollView, View, Dimensions, StyleSheet, FlatList,
} from 'react-native';
import Text from '../../ui/Text';
import AppActions from '../../redux/AppRedux/actions';
import { Colors } from '../../themes';
import Button from '../../ui/Button';
import { size, fontWeight } from '../../themes/Fonts';
import PurchaseServiceItem from '../../components/Items/PurchaseServiceItem';
import PurchaseLevelItem from '../../components/Items/PurchaseLevelItem';
// import {
//   initIAP,
//   getIAPSubscriptionDetails,
//   subscribe,
//   restoreSubcription,
// } from '../../utils/IAPUtils';
import BackgroundImage from '../../ui/BackgroundImage';
// import { push } from '../../navigation/navigationActions';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      iapList: null,
    };
    // this.getListProduct();
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onPress = (item, index) => {
    this.setState({ selected: index });
  };

  openWebView = (title, passProps) => () => {
    const { componentId } = this.props;
    // push(componentId, 'WebView', {
    //   title: I18n.t(title),
    //   passProps,
    //   topBar: {
    //     largeTitle: {
    //       visible: false,
    //     },
    //   },
    // });
  };

  onPurchase = async () => {
    // const { iapList, selected } = this.state;
    // const result = await subscribe(iapList[selected].productId);
    // if (result.purchaseState === 'PurchasedSuccessfully') {
    //   this.setPremium(result, 'Purchase Successfully!');
    // }
  };

  getListProduct = async () => {
    try {
      // await initIAP();
      // const data = await getIAPSubscriptionDetails();
      // this.setState({ iapList: data });
    } catch (error) {
      console.log('error', error);
    }
  };

  setPremium = (data, message) => {
    // this.props.setPremium({ isPremium: true, ...data });
    // this.props.navigator.dismissModal();
    // setTimeout(() => {
    //   alert(message);
    // }, 10);
  };

  restore = async () => {
    // const data = await restoreSubcription();
    // if (data && data.length > 0) {
    //   this.setPremium({ productId: data[0] }, 'Restore Successfully!');
    // }
  };

  renderItem = ({ item, index }) => {
    return <PurchaseServiceItem item={item} />;
  };

  renderPurchaseLevelItem = ({ item, index }) => {
    return (
      <PurchaseLevelItem
        onPress={() => this.onPress(item, index)}
        isSelected={this.state.selected === index}
        item={item}
        index={index}
      />
    );
  };

  render() {
    const { iapList } = this.state;
    return (
      <View style={styles.container}>
        <BackgroundImage imageName="iapBackground" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.vHeader}>
            <Text center type="title2Bold" color={Colors.primary}>
              {I18n.t('purchase.goPremium')}
            </Text>
            <Text center type="body1SemiBold" color={Colors.primaryText}>
              {I18n.t('purchase.subTitle')}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={I18n.t('purchase.feature')}
            renderItem={this.renderItem}
          />
          <Button
            secondary
            onPress={this.onPurchase}
            buttonTitle={I18n.t('purchase.freeTrial', { price: '3.99' })}
            style={styles.buttonTrial}
          />
          <Button
            transparent
            onPress={this.onPurchase}
            buttonTitle={I18n.t('button.continue').toUpperCase()}
            subTitle={I18n.t('purchase.continuePrice', { price: '9.99' })}
            style={styles.button}
          />
          <View style={styles.vBottom}>
            <Text
              onPress={this.openWebView('moreText.legal.privacy', {
                uri: I18n.t('appInfo.privacyPolicyURL'),
              })}
              style={styles.txtRestore}
              center
              underline
              color={Colors.gray}
            >
              {I18n.t('moreText.legal.privacy')}
            </Text>
            <Text
              onPress={this.restore}
              style={styles.txtRestore}
              center
              underline
              color={Colors.gray}
            >
              {I18n.t('button.restore')}
            </Text>
            <Text
              onPress={this.openWebView('moreText.legal.terms', {
                uri: I18n.t('appInfo.privacyPolicyURL'),
              })}
              style={styles.txtRestore}
              center
              underline
              color={Colors.gray}
            >
              {I18n.t('moreText.legal.terms')}
            </Text>
          </View>
          <Text style={styles.txtDescription}>{I18n.t('purchase.description')}</Text>
        </ScrollView>
      </View>
    );
  }
}
Purchase.propTypes = {
  componentId: PropTypes.string,
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
  },
  vHeader: {
    marginTop: 150,
  },
  appName: {
    fontSize: size.xxlarge,
  },
  buttonTrial: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  button: {
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: Colors.primaryText,
    borderWidth: 1,
  },
  vBottom: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  txtRestore: {
    fontSize: 13,
    fontWeight: fontWeight.medium,
    color: Colors.primary,
  },
  txtDescription: {
    marginHorizontal: 15,
    fontSize: 13,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentPurchaseLevel: {},
  btnPremium: {
    width: 67,
    height: 18,
    borderRadius: 5,
    backgroundColor: '#ffcc00',
    marginLeft: 5,
  },
  txtPremium: {
    fontSize: 11,
    color: '#6b00ff',
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    setPremium: data => dispatch(AppActions.setPremium(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
