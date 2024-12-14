import React, { useState } from 'react';
import { useSharedState } from './SharedStateProvider';

export default function FeatureMenu() {
    const { columns, phones } = useSharedState(); 
    const [filters, setFilters] = useState({
        storage: { min: 0, max: 512 },
        ram: { min: 0, max: 16 },
        cpu_cores: { min: 0, max: 16 },
        pixels: { min: 0, max: 1080 },
        screen_size: { min: 0, max: 7 },
        weight: { min: 0, max: 300 },
        battery: { min: 0, max: 5000 },
        resolution: { min: 0, max: 4000 },
        year: { min: 2000, max: 2024 },
        cost: { min: 0, max: 1000 },
    });


    const displayMapping = {
        Foldable: 'Foldable',
        phone_model: 'Model',
        price: 'Cost',
        currency: 'Currency',
        storage: 'Storage',
        ram: 'RAM',
        Launch: 'Launch Date',
        Dimensions: 'Dimensions',
        Weight: 'Weight',
        Display_Type: 'Display Type',
        Display_Size: 'Display Size',
        Display_Resolution: 'Display Resolution',
        OS: 'OS',
        NFC: 'NFC',
        BATTERY: 'Battery',
        Features_Sensors: 'Feature Sensors',
        Colors: 'Colors',
        Video: 'Video',
        Chipset: 'Chipset',
        CPU: 'CPU',
        GPU: 'GPU',
        Year: 'Year',
        price_range: 'Price Range',
    };

    const capitalizeLabel = (label) => {
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    const filteredPhones = phones.filter((phone) => {
        return (
            phone.storage >= filters.storage.min &&
            phone.storage <= filters.storage.max &&
            phone.ram >= filters.ram.min &&
            phone.ram <= filters.ram.max &&
            phone.cpu_cores >= filters.cpu_cores.min &&
            phone.cpu_cores <= filters.cpu_cores.max &&
            phone.pixels >= filters.pixels.min &&
            phone.pixels <= filters.pixels.max &&
            phone.screen_size >= filters.screen_size.min &&
            phone.screen_size <= filters.screen_size.max &&
            phone.weight >= filters.weight.min &&
            phone.weight <= filters.weight.max &&
            phone.battery >= filters.battery.min &&
            phone.battery <= filters.battery.max &&
            phone.resolution >= filters.resolution.min &&
            phone.resolution <= filters.resolution.max &&
            phone.year >= filters.year.min &&
            phone.year <= filters.year.max &&
            phone.price >= filters.cost.min &&
            phone.price <= filters.cost.max
        );
    });

    const handleFilterChange = (field, type, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [type]: value,
            },
        }));
    };

    return (
        <aside className="p-4 pt-8 pr-16 w-fit border-r-2">
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-medium">Filters</h3>
                    <div className="flex flex-col gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Storage</label>
                            <input
                                type="range"
                                min="0"
                                max="512"
                                value={filters.storage.max}
                                onChange={(e) => handleFilterChange('storage', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.storage.max} GB</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">RAM</label>
                            <input
                                type="range"
                                min="0"
                                max="16"
                                value={filters.ram.max}
                                onChange={(e) => handleFilterChange('ram', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.ram.max} GB</span>
                            </div>
                        </div>

                        {/* CPU Cores Range */}
                        <div>
                            <label className="block text-sm font-medium">CPU Cores</label>
                            <input
                                type="range"
                                min="0"
                                max="16"
                                value={filters.cpu_cores.max}
                                onChange={(e) => handleFilterChange('cpu_cores', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.cpu_cores.max}</span>
                            </div>
                        </div>

                        {/* Pixels Range */}
                        <div>
                            <label className="block text-sm font-medium">Pixels</label>
                            <input
                                type="range"
                                min="0"
                                max="1080"
                                value={filters.pixels.max}
                                onChange={(e) => handleFilterChange('pixels', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.pixels.max}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Screen Size</label>
                            <input
                                type="range"
                                min="0"
                                max="7"
                                value={filters.screen_size.max}
                                onChange={(e) => handleFilterChange('screen_size', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.screen_size.max} inches</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Weight</label>
 
                            <input
                                type="range"
                                min="0"
                                max="300"
                                value={filters.weight.max}
                                onChange={(e) => handleFilterChange('weight', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.weight.max} grams</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Battery</label>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={filters.battery.max}
                                onChange={(e) => handleFilterChange('battery', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.battery.max} mAh</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Resolution</label>
                            <input
                                type="range"
                                min="0"
                                max="4000"
                                value={filters.resolution.max}
                                onChange={(e) => handleFilterChange('resolution', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.resolution.max}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Release Year</label>
                            <input
                                type="range"
                                min="2000"
                                max="2024"
                                value={filters.year.max}
                                onChange={(e) => handleFilterChange('year', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.year.max}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Cost</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={filters.cost.max}
                                onChange={(e) => handleFilterChange('cost', 'max', e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs">
                                <span>{filters.cost.max}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-medium">Filtered Phones</h3>
                    <ul className="mt-4">
                        {filteredPhones.map((phone) => (
                            <li key={phone.id} className="py-2">
                                {columns.map((column) => (
                                    <div key={column} className="text-sm">{capitalizeLabel(column)}: {phone[column]}</div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
