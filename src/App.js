import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import FeatureMenu from './components/FeatureMenu';
import { SharedStateProvider } from './components/SharedStateProvider';
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <SharedStateProvider>
            <div className="flex flex-col h-screen"> {/* Full height container */}
                <header className="h-16 border-b-2"> {/* Fixed height for header */}
                    <NavigationMenu />
                </header>
                <main className="flex flex-1 overflow-hidden"> {/* Flexbox for main content */}
                    <aside className="w-64 p-8 border-r-2 overflow-y-auto"> {/* Fixed width for sidebar */}
                        <FeatureMenu />
                    </aside>
                    <section id="dashboard" className="flex-1 p-8 overflow-y-auto"> {/* Dashboard grows to fill space */}
                        <Dashboard />
                    </section>
                </main>
            </div>
        </SharedStateProvider>
    );
}

export default App;



// // App.js
// import React from 'react';
// import NavigationMenu from './components/NavigationMenu';
// import FeatureMenu from './components/FeatureMenu';
// import { SharedStateProvider } from './components/SharedStateProvider';
//
// import Dashboard from "./components/Dashboard";
//
// function App() {
//
//     return (
//         <SharedStateProvider>
//             <NavigationMenu />
//             <main className={"flex"}>
//                 <aside className={"p-8 border-r-2 h-[calc(100vh-60px)]"}>
//                     <FeatureMenu />
//                 </aside>
//                 <section id={"dashboard"} className={"flex-1 p-8 h-[calc(100vh-90px)]"}>
//                     <Dashboard />
//                 </section>
//             </main>
//         </SharedStateProvider>
//     );
// }
//
// export default App;
