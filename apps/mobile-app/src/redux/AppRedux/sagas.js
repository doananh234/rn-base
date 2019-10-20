import {takeLatest} from 'redux-saga/effects';
import {Types} from './actions';
import {navigate} from '../../navigation/NavigatorService';

function startup() {
  navigate('BottomTabNavigator');
}

export default [takeLatest(Types.START_UP, startup)];
