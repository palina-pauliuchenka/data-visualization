import React from 'react';
import { useSharedState } from './SharedStateProvider';

export default function Dashboard() {
    const { phones } = useSharedState(); // Access shared state for phones

    return (
        <section>
            <h2 className="font-bold mb-4">Dashboard</h2>
            <div className="phone-list">
                {phones.length > 0 ? (
                    <ul className="space-y-2">
                        {phones.map((phone, index) => (
                            <li key={index} className="p-2 border-b">
                                <span className="font-medium">{phone.model}</span> - <span>{phone.brand}</span> - <span>{phone.price}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No phones available</p>
                )}
            </div>
        </section>
    );
}
