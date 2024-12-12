// import React from 'react';
// import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Generate = () => {
//   const pdfUrl = 'https://drive.google.com/file/d/10hSzPmpo3Vlohkpt0S-n4gUIGpmNShCs/preview';

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: pdfUrl }}
//         style={styles.webview}
//         startInLoadingState={true} // Show a loader while the PDF is loading
//         renderLoading={() => (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color="#000" />
//             <Text>Loading PDF...</Text>
//           </View>
//         )}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         onError={() => alert('Failed to load the PDF. Please check your connection or the file permissions.')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Generate;



// Taking from server

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import axios from 'axios'; // Add axios for making API requests

// const Generate = () => {
//   const [pdfUrl, setPdfUrl] = useState(null);

//   useEffect(() => {
//     const fetchPDF = async () => {
//       try {
//         const response = await axios.get('http://your-server-url/api/pdf'); // Replace with your server URL
//         if (response.status === 200) {
//           setPdfUrl(response.data.pdfPath); // Assuming your server returns the PDF path
//         } else {
//           console.error('Error fetching PDF:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching PDF:', error);
//       }
//     };

//     fetchPDF();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {pdfUrl && ( // Only render WebView if pdfUrl is available
//         <WebView
//           source={{ uri: pdfUrl }}
//           style={styles.webview}
//           startInLoadingState={true}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default Generate;


// Correct 

// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Generate = () => {

//   const pdfUrl = 'https://drive.google.com/file/d/10hSzPmpo3Vlohkpt0S-n4gUIGpmNShCs/preview';

//     return (
//         <View style={styles.container}>
//             <WebView
//                 source={{ uri: pdfUrl }}
//                 style={styles.webview}
//                 startInLoadingState={true} 
//                 javaScriptEnabled={true} 
//                 domStorageEnabled={true} 
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     webview: {
//         flex: 1,
//     },
// });

// export default Generate;

// With downloadable pdf

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const Generate = () => {
  const pdfUrl = 'https://drive.google.com/file/d/10hSzPmpo3Vlohkpt0S-n4gUIGpmNShCs/view'; // Google Drive view link

  const handleGoogleDriveRedirect = () => {
    Linking.openURL(pdfUrl)
      .then(() => {
        Alert.alert('Redirected to Google Drive', 'You can view or download the file from Google Drive.');
      })
      .catch((err) => {
        console.error('Failed to open Google Drive:', err);
        Alert.alert('Error', 'Could not open Google Drive. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfUrl }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <TouchableOpacity style={styles.downloadButton} onPress={handleGoogleDriveRedirect}>
        <Text style={styles.downloadText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  downloadButton: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  downloadText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Generate;



//  For a random link

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import RNFS from 'react-native-fs';
// import axios from 'axios';

// const Generate = () => {
//   const [pdfUrl, setPdfUrl] = useState(null); // State to store the fetched PDF URL
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Replace with your server's API endpoint that provides the PDF URL
//     const fetchPdfUrl = async () => {
//       try {
//         const response = await axios.get('https://your-server.com/api/get-pdf-url');
//         setPdfUrl(response.data.url); // Assume server response contains { url: "PDF_LINK" }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching PDF URL:', error);
//         Alert.alert('Error', 'Failed to fetch PDF URL from the server.');
//         setLoading(false);
//       }
//     };

//     fetchPdfUrl();
//   }, []);

//   const downloadFile = async () => {
//     if (!pdfUrl) {
//       Alert.alert('Error', 'No PDF URL available.');
//       return;
//     }

//     const fileName = 'downloaded_pdf.pdf';
//     const path = RNFS.DocumentDirectoryPath + '/' + fileName;

//     try {
//       const result = await RNFS.downloadFile({
//         fromUrl: pdfUrl,
//         toFile: path,
//       }).promise;

//       if (result.statusCode === 200) {
//         Alert.alert('Success', 'File downloaded successfully!');
//       } else {
//         Alert.alert('Error', 'Failed to download file');
//       }
//     } catch (err) {
//       console.error('Failed to download PDF:', err);
//       Alert.alert('Error', 'An error occurred while downloading the file.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {pdfUrl ? (
//         <WebView
//           source={{ uri: pdfUrl }}
//           style={styles.webview}
//           startInLoadingState={true}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//         />
//       ) : (
//         <Text>No PDF available</Text>
//       )}
//       <TouchableOpacity style={styles.downloadButton} onPress={downloadFile}>
//         <Text style={styles.downloadText}>Download PDF</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
//   downloadButton: {
//     backgroundColor: 'black',
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   downloadText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Generate;
