"use client"

// pages/index.js
import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');

    const handleCreateMeta = async () => {
        const response = await fetch('/api/generate', {
            method: 'GET',
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h1>Create _meta.json</h1>
            <button onClick={handleCreateMeta}>Create</button>
            {message && <p>{message}</p>}
        </div>
    );
}
