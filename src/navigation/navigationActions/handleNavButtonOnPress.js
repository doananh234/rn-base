import { dismissModal, dismissAllModals } from './showModal';
import { pop } from './push';
import { toggleSideMenu } from './stackWithSideMenu';

export const onNavigatorEvent = (buttonId, componentId) => {
  switch (buttonId) {
    case 'sideMenu':
      toggleSideMenu();
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
