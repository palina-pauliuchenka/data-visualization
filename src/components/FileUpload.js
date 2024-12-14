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
                const brand = columns[0] || '';         //0
                const phoneModel = columns[1] || '';    //1
                const price = columns[2] || '';         //2
                const storage = columns[3] || '';       //3
                const ram = columns[4] || '';           //4
                const weight = columns[5] || '';        //5
                const displaySize = columns[6] || '';   //6
                const OS = columns[7] || '';            //7
                const NFC = columns[8] || '';           //8
                const battery = columns[9] || '';       //9
                const ppi = columns[10] || '';          //10
                const chipset = columns[11] || '';      //11
                const foldable = columns[12] || '';     //12
                const year = columns[13] || '';         //13
                const colors = columns[14] || '';       //14

                // Only add valid data entries
                if (brand && phoneModel) {
                    brandSet.add(brand);
                    phoneList.push({
                        brand,
                        model: phoneModel,
                        price,
                        storage,
                        ram,
                        weight,
                        size: displaySize,
                        OS,
                        NFC,
                        battery,
                        ppi,
                        chipset,
                        foldable,
                        year,
                        colors,
                    });
                }
            });
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
