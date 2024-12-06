import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import FeatureMenu from './components/FeatureMenu';
import FileUpload from './components/FileUpload';
import { SharedStateProvider } from './components/SharedStateProvider';

function App() {
    return (
        <SharedStateProvider>
            <div>
                <NavigationMenu />
                <FeatureMenu />
            </div>
        </SharedStateProvider>
    );
}

export default App;


// import './App.css';
// import NavigationMenu from './components/NavigationMenu';
// import FeatureMenu from './components/FeatureMenu';
//
// function App() {
//   return (
//       <>
//           <NavigationMenu />
//           <FeatureMenu />
//       </>
//   );
// }
//
// export default App;
