import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewPlanet = ({ planetId }) => {
    const [planetData, setPlanetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanetData = async () => {
            try {
                const response = await axios.get(`https://dragonball-api.com/api/planets/${planetId}`);
                setPlanetData(response.data);
                setLoading(false);
            } catch (error) {
                setError(`Error fetching planet data: ${error.message}`);
                setLoading(false);
            }
        };

        fetchPlanetData();
    }, [planetId]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">{planetData.name}</h2>
            <img 
                src={planetData.image} 
                alt={planetData.name} 
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-white text-lg mb-2"><strong>Race:</strong> {planetData.race}</p>
            <p className="text-white text-lg mb-2"><strong>Population:</strong> {planetData.population}</p>
            <p className="text-white text-lg mb-2"><strong>Description:</strong> {planetData.description}</p>
            <p className="text-white text-lg mb-4"><strong>Notable Residents:</strong> {planetData.notableResidents.join(', ')}</p>
            <Link to={`/characters?planetId=${planetId}`} className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300">
                View Characters from {planetData.name}
            </Link>
        </div>
    );
};

export default ViewPlanet;
