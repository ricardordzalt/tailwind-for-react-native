import React from 'react';
import {TWRNProvider, useTW} from '../src';
const App = () => {
  const {tw} = useTW();
  tw('flex-1 bg-navyBlue justify-center items-center android:padding-40');
  return <></>;
};

const AppWrapper = () => {
  return (
    <TWRNProvider
      mode="dark"
      styles={{
        bigFontSize: 'font-black color-#34f',
      }}>
      <App />
    </TWRNProvider>
  );
};

export default AppWrapper;
