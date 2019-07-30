import I18n from 'i18n-js';
import { iconsMap } from '../utils/appIcons';
import { Colors, Fonts } from '../themes';

export const close = () => ({
  id: 'close',
  icon: iconsMap.close,
  disabled: false,
  disableIconTint: true,
  color: Colors.iconNav,
});

export const closeAll = () => ({
  id: 'closeAll',
  icon: iconsMap.close,
  disabled: false,
  disableIconTint: true,
  color: Colors.iconNav,
});

export const back = (customBack = false, color = Colors.iconNav) => ({
  icon: iconsMap.back,
  id: customBack ? 'customBack' : 'back',
  disabled: false,
  disableIconTint: true,
  color,
});

export const cancel = {
  text: 'Cancel',
  id: 'cancel',
  disabled: false,
  disableIconTint: true,
  color: Colors.iconNav,
};

export const share = (color = Colors.default) => ({
  id: 'like',
  icon: iconsMap.share,
  disabled: false,
  disableIconTint: false,
  color,
});

export const edit = (color = Colors.default) => ({
  id: 'review',
  icon: iconsMap.edit,
  disabled: false,
  disableIconTint: false,
  color,
});

export const love = (color = Colors.default) => ({
  id: 'like',
  icon: iconsMap.love,
  disabled: false,
  disableIconTint: false,
  color,
});

export const filter = (color = Colors.titleNav) => ({
  id: 'filter',
  icon: iconsMap.filter,
  disabled: false,
  disableIconTint: false,
  color,
});

export const done = (color = Colors.titleNav) => ({
  id: 'done',
  icon: iconsMap.check,
  disabled: false,
  disableIconTint: false,
  color,
});

export const add = (color = Colors.iconNav) => ({
  id: 'add',
  icon: iconsMap.plus,
  disabled: false,
  disableIconTint: false,
  color,
});

export const signUp = () => ({
  text: I18n.t('button.signUp'),
  id: 'Signup',
  disabled: false,
  disableIconTint: false,
  color: Colors.iconNav,
  fontFamily: Fonts.type.semiBold,
});

export const login = () => ({
  text: I18n.t('button.login'),
  id: 'login',
  disabled: false,
  disableIconTint: false,
  color: Colors.iconNav,
  fontFamily: Fonts.type.semiBold,
});
