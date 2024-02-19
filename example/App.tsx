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

const CustomSafeAreaView = styled(SafeAreaView)`
  bg-lighter
  dark:bg-darker
`;

const CustomScrollView = styled(ScrollView)`
  bg-lighter
  dark:bg-darker
`;

const ContentContainer = styled(View)`
  bg-white
  dark:bg-black
`;

const BoldText = styled(Text)`
  font-bold
`;

const SectionContainer = styled(View)`
  mt-32
  px-24
`;

const SectionTitle = styled(Text)`
  font-size-24
  font-semibold
  color-black
  dark:color-white
`;

const SectionText = styled(Text)`
  mt-8
  font-size-18
  font-normal
  color-dark
  dark:color-light
`;

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionText>{children}</SectionText>
    </SectionContainer>
  );
}

function YourApp(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {tw} = useTW();
  const statusBarBackgroundColor = tw('bg-lighter dark:bg-darker');

  return (
    <CustomSafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarBackgroundColor}
      />
      <CustomScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <ContentContainer>
          <Section title="Step One">
            Edit <BoldText>App.tsx</BoldText> to change this screen and then
            come back to see your edits.
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
        </ContentContainer>
      </CustomScrollView>
    </CustomSafeAreaView>
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
