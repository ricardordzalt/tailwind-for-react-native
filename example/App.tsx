import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {styled, TWRNProvider, useTW} from '../src';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const SectionContainer = styled(View)`
    mt-32
    px-24
  `;

const SectionTitle = styled(Text)`
    font-size-24
    font-weight-600
    color-black
    dark:color-white
  `;

const SectionDescription = styled(Text)`
    mt-8
    font-size-18
    font-weight-400
    color-black
    dark:color-light
  `;

const HighlightText = styled(Text)`
    font-weight-700
  `;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{children}</SectionDescription>
    </SectionContainer>
  );
}

function YourApp(): JSX.Element {
  const {tw, mode} = useTW();
  const backgroundStyle = tw('bg-white dark:bg-dark');
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={mode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={tw('bg-white dark:bg-black')}>
          <Section title="Step One">
            Edit <HighlightText>App.tsx</HighlightText> to change this screen
            and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const App = () => {
  const mode = useColorScheme();
  return (
    <TWRNProvider theme={{mode, colors: Colors}}>
      <YourApp />
    </TWRNProvider>
  );
};

export default App;
