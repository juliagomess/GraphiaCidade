import { NativeModules, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

if (Platform.OS === 'ios') {
  let scriptHostname;

  if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];

    const tron = Reactotron.configure({ host: scriptHostname })
      .useReactNative()
      .connect();

    console.tron = tron;

    tron.clear();
  }
}

if (Platform.OS === 'android') {
  let scriptHostname;

  if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];

    const tron = Reactotron.configure({ host: scriptHostname })
      .useReactNative()
      .connect();

    console.tron = tron;

    tron.clear();
  }
}
