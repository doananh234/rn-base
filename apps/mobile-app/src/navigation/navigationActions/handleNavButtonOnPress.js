import { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { dismissModal, dismissAllModals } from './showModal';
import { pop } from './push';
import { toggleSideMenu } from './stackWithSideMenu';

export const onNavigatorEvent = (buttonId, componentId) => {
  switch (buttonId) {
    case 'sideMenu':
      toggleSideMenu(true, componentId);
      break;
    case 'back':
      pop(componentId);
      break;
    case 'close':
      dismissModal(componentId);
      break;
    case 'closeAll':
      dismissAllModals();
      break;
    default:
  }
};

export function useNavigationEvents(
  handler: (event: NavigationButtonPressedEvent) => void,
) {
  useEffect(() => {
    const subsNBP = Navigation.events().registerNavigationButtonPressedListener(
      handler,
    );
    return () => {
      subsNBP.remove();
    };
  }, [handler]);

  useEffect(() => {
    const subsBTS = Navigation.events().registerBottomTabSelectedListener(
      handler,
    );
    return () => {
      subsBTS.remove();
    };
  }, [handler]);
}
