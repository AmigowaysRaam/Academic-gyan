import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { launchImageLibrary } from 'react-native-image-picker';

// Main component
const App = () => {
  // Type the webViewRef to correctly reference a WebView component
  const webViewRef = useRef<WebView | null>(null);

  // Function to handle messages from the WebView
  const onMessage = (event: any) => {
    const message = event.nativeEvent.data;
    console.log('Received message: ', message);

    if (message === 'openGallery') {
      // Open the gallery when the message is 'openGallery'
      openGallery();
    }
  };

  // Function to launch the gallery
  const openGallery = () => {
    console.log("Opening image library...");
    launchImageLibrary(
      {
        mediaType: 'photo', // You can adjust the media type to 'photo' or 'video'
        includeBase64: false, // Set to true if you need base64 encoding of the image
      },
      (response: any) => {
        console.log('Image picker response:', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
          Alert.alert('Gallery closed', 'No image was selected');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', `Image Picker error: ${response.errorMessage}`);
        } else {
          // Handle the selected image URL
          const imageUri = response.assets[0].uri;
          console.log('Image selected: ', imageUri);
          
          // Send the image URI to the WebView if it exists
          if (webViewRef.current) {
            webViewRef.current.postMessage(imageUri);
          }
        }
      }
    );
  };

  // JavaScript injection to handle the image URI and update the image
  const injectedJavaScript = `
    document.addEventListener("message", function(event) {
      const imageUri = event.data;
      const imgElement = document.getElementById("selectedImage");
      if (imgElement) {
        imgElement.src = imageUri;
      }
    });
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.academicgyan.com/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
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
