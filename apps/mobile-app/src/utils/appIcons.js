/* eslint-disable new-cap */
import MealPlanner from 'react-native-vector-icons/mealplanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  back: [20, Colors.primary],
  close: [20, Colors.primary],
  share: [20, '#fff'],
  like: [20, '#fff'],
  edit: [20, '#fff'],
  filter: [20, '#fff'],
  love: [20, '#fff'],
  dish: [20, Colors.primary],
  calendar: [20, Colors.primary],
  user: [20, Colors.primary],
  'ic-search': [20, '#fff'],
  'ic-all-member': [20, '#fff'],
  'ic-donation-blood': [20, '#fff'],
  'ic-admin': [20, '#fff'],
  'ic-blood': [24, '#fff'],
  'ic-add-member': [24, '#fff'],
  'ios-arrow-dropleft-circle': [30, '#fff', 'ionicons'],
  'ios-checked': [30, '#000', 'ionicons'],
};

const iconsMap = {};
const iconsLoaded = new Promise(resolve => {
  new Promise.all(
    Object.keys(icons).map(iconName => {
      switch (icons[iconName][2]) {
        case 'ionicons':
          return Ionicons.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1],
          );
        default:
          return MealPlanner.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1],
          );
      }
    }),
  ).then(sources => {
    Object.keys(icons).forEach((iconName, idx) => {
      iconsMap[iconName] = sources[idx];
    });

    // Call resolve (and we are done)
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
