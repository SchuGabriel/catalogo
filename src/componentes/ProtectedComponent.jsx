// src/componentes/ProtectedComponent.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/auth/protected')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h1>Protected Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ProtectedComponent;
