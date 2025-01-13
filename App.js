import React, { useState, useEffect, useCallback } from "react";
import { LogBox, View, StatusBar, Platform ,Text} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import { MainNavigator } from "./src/services/navigation";
import { store } from "./src/redux/store";
import { colors, heightPixel } from "./src/services";
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';


const STYLES = ["dark-content", "light-content"];


const App = () => {
  let persistor = persistStore(store);

  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS == "ios" ? heightPixel(50) : 0 }} >
          <StatusBar
            animated={true}
            backgroundColor={colors.white}
            barStyle={statusBarStyle}
            translucent
          />
          <MainNavigator />
        </SafeAreaView>
        {/* </GestureHandlerRootView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
