// Import necessary packages
import React from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

// Main component
const App = () => {
  const onMessage = (event:any) => {
    const message = event.nativeEvent.data;
    Alert.alert('Message Received', 'HI');
    if (message === 'openGallery') {
      Alert.alert('Message Received', 'HI');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://www.academicgyan.com/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={onMessage}
        injectedJavaScript={`
          document.addEventListener("message", function(event) {
            window.ReactNativeWebView.postMessage(event.data);
          });
        `}
      />
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
