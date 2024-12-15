// App.js
import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import FeatureMenu from './components/FeatureMenu';
import { SharedStateProvider } from './components/SharedStateProvider';

import Dashboard from "./components/Dashboard";

function App() {

    return (
        <SharedStateProvider>
            <NavigationMenu />
            <main className={"flex"}>
                <aside className={"p-8 border-r-2 h-[calc(100vh-60px)]"}>
                    <FeatureMenu />
                </aside>
                <section id={"dashboard"} className={"flex-1 p-8 h-[calc(100vh-100px)]"}>
                    <Dashboard />
                </section>
            </main>
        </SharedStateProvider>
    );
}

export default App;
