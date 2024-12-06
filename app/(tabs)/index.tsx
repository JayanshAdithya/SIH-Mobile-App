
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen'; 
// import Screen1 from './screen1';
import Screen2 from './screen2';
import Screen3 from './screen3';
import Screen4 from './screen4';
// import PDFdisplay from './PDFdisplay';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="MainLogin" component={MainLogin}  /> */}
      <Stack.Screen name="Home" component={HomeScreen}  />
      {/* <Stack.Screen name="./index" options={{headerShown:false}}   /> */}
      {/* <Stack.Screen name="Screen1" component={Screen1} /> */}
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen4" component={Screen4} />
      {/* <Stack.Screen name="PDFdisplay" component={PDFdisplay} /> */}
    </Stack.Navigator>
  );
};

export default App;

// Testing the SearchBar

// // App.js
// import React from 'react';
// import SearchBar from '../../components/SearchBar'; // Adjust the path as necessary

// const App = () => {
//     const pdfFileNames = [
//         'report.pdf',
//         'summary.pdf',
//         'presentation.pdf',
//         'notes.pdf',
//         'data.pdf',
//         'darvin.pdf',
//         'overview.pdf',
//     ];

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>PDF File Search</h1>
//             <SearchBar items={pdfFileNames} />
//         </div>
//     );
// };

// export default App;
