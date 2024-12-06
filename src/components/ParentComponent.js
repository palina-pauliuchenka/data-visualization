import React, { useState } from 'react';
import FileUpload from './FileUpload';
import NavigationMenu from './NavigationMenu';

export default function ParentComponent() {
    const [brands, setBrands] = useState([]); // State to store unique brands
    console.log("setBrands:", setBrands);

    return (
        <div>
            <NavigationMenu brands={brands} />
            <FileUpload setBrands={setBrands} /> {/* Pass setBrands here */}
        </div>
    );
}
