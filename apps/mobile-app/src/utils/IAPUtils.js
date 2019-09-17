// import InAppBilling from 'react-native-iap';
// import _ from 'lodash';

// const IAP_SUBSCRIPTION_IDS = [
//   'com.educationapps.learnenglish.subscription.year',
//   'com.educationapps.learnenglish.subscription.month',
//   'com.educationapps.learnenglish.subscription.week',
// ];

// export const initIAP = async() => {
//   const response = await InAppBilling.open();
//   return response;
// };

// export const getIAPSubscriptionDetail = async id => {
//   const response = await InAppBilling.getSubscriptionDetails(id);
//   return response;
// };

// export const getIAPSubscriptionDetails = async() => {
//   const response = await InAppBilling.getSubscriptionDetailsArray(
//     IAP_SUBSCRIPTION_IDS,
//   );
//   return _.sortBy(response, e => -e.priceValue);
// };

// export const checkSubscription = async id => {
//   const response = await InAppBilling.isSubscribed(id);
//   return response;
// };

// export const restoreSubcription = async() => {
//   const response = await InAppBilling.listOwnedSubscriptions();
//   return response;
// };

// export const subscribe = async id => {
//   const response = await InAppBilling.subscribe(id);
//   return response;
// };
