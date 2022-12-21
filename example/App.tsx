import React from 'react';
import {Button, Text, View} from 'react-native';
import {TWRNProvider, useTW} from '../src';
const App = () => {
  const {tw, mode, toggleMode, colors} = useTW();
  return (
    <View
      style={tw(
        'flex-1 bg-white dark:bg-navyBlue justify-center items-center android:padding-40',
      )}>
      <Text style={tw('big-font-size dark:text-#dcdcdc')}>EXAMPLE</Text>
      <Text style={tw('dark:text-#dcdcdc mt-5')}>
        TAILWIND FOR REACT NATIVE
      </Text>
      <Text style={tw('dark:text-#dcdcdc mt-hp(2)')}>{mode} Mode</Text>
      <Button
        title="Toggle mode"
        onPress={toggleMode}
        color={mode === 'dark' ? 'white' : colors?.navyBlue}
      />
    </View>
  );
};

const AppWrapper = () => {
  return (
    <TWRNProvider
      theme={{
        colors: {
          navyBlue: '#4232dd',
        },
        styles: {
          'big-font-size': {
            fontSize: 50,
          },
        },
        mode: 'dark',
      }}>
      <App />
    </TWRNProvider>
  );
};

export default AppWrapper;
