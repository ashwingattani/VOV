/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppSetup from './src/setup/AppSetup';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => AppSetup);
