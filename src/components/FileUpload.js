import React from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

export default function FileUpload({ setBrands }) {
    console.log("setBrands:", setBrands); // Debugging: Check if setBrands is passed correctly

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n');
            const brandSet = new Set();

            rows.forEach((row, index) => {
                if (index === 0) return; // Skip the header row
                const columns = row.split(',');

                const brand = columns[0]?.trim();

                if (brand) {
                    brandSet.add(brand);
                }
            });

            setBrands([...brandSet]); // Use setBrands correctly
        };

        reader.readAsText(file);
    };

    return (
        <form className={"bg-neutral-300 px-2 py-1 text-sm"}>
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }} className={"flex items-center"}>
                <MdOutlineFileUpload style={{ marginRight: '10px' }} />
                Upload
            </label>
            <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
        </form>
    );
}
