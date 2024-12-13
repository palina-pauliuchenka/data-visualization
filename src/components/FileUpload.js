import React from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useSharedState } from './SharedStateProvider';

export default function FileUpload() {
    const { setBrands, setColumns, setPhones } = useSharedState();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n');

            // Parse header row to identify columns
            const headerRow = rows[0]?.split(',').map((col) => col.trim()) || [];
            setColumns(headerRow); // Update columns state

            const brandSet = new Set();
            const phoneList = [];

            rows.forEach((row, index) => {
                if (index === 0) return; // Skip the header row
                const columns = row.split(',').map((col) => col.trim()); // Trim all columns

                // Extract relevant data from the columns
                const brand = columns[0] || '';
                const phoneModel = columns[1] || '';
                const price = columns[3] || '';
                const currency = columns[4] || '';
                const priceUSD = columns[5] || '';
                const storage = columns[6] || '';
                const ram = columns[7] || '';
                const launch = columns[8] || '';
                const dimension = columns[9] || '';
                const weight = columns[10] || '';
                const displayType = columns[11] || '';
                const displaySize = columns[12] || '';
                const foldable = columns[25] || '';  // Adjust based on your CSV structure

                // Only add valid data entries
                if (brand && phoneModel) {
                    brandSet.add(brand);
                    phoneList.push({
                        brand,
                        model: phoneModel,
                        price,
                        currency,
                        priceUSD,
                        storage,
                        ram,
                        launch,
                        dimension,
                        weight,
                        displayType,
                        displaySize,
                        foldable,
                    });
                }
            });

            // Update shared state with the extracted data
            setBrands([...brandSet]);
            setPhones(phoneList);
        };

        reader.readAsText(file);
    };

    return (
        <form className="bg-neutral-300 px-2 py-1 text-sm">
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }} className="flex items-center">
                <MdOutlineFileUpload style={{ marginRight: '10px' }} />
                Upload CSV
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
