/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect} from 'react';
 import type {Node} from 'react';
 import {
   KeyboardAvoidingView,
   Platform,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   useColorScheme,
 } from 'react-native';
 import AppNavigation from './AppNavigation';
 import {Provider} from 'react-redux';
 import {PersistGate} from 'redux-persist/integration/react';
 import {Persistor, Store} from './src/redux';
 import Toast from 'react-native-toast-message';
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
 
       {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
       <Provider store={Store}>
         <PersistGate loading={null} persistor={Persistor}>
           {Platform.OS == 'ios' ? (
             <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
               <AppNavigation />
               <Toast style={{bottom: -30}} />
             </KeyboardAvoidingView>
           ) : (
             <>
               <AppNavigation />
               <Toast style={{bottom: -30}} />
             </>
           )}
         </PersistGate>
       </Provider>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
 });
 
 export default App;
 