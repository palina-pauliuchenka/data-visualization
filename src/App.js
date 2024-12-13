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
                <aside className={""}>
                    <FeatureMenu />
                </aside>
                <section id={"dashboard"} className={"flex-1 p-8"}>
                    <Dashboard />
                </section>
            </main>
        </SharedStateProvider>
    );
}

export default App;
