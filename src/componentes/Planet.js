import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Planet = ({ planetId }) => {
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        const fetchPlanetData = async () => {
            try {
                const response = await axios.get(`https://dragonball-api.com/api/planets/${planetId}`);
                setPlanet(response.data);
            } catch (error) {
                console.error(`Error fetching planet with ID ${planetId}:`, error);
            }
        };

        fetchPlanetData();
    }, [planetId]);

    if (!planet) return <p>Loading planet data...</p>;

    return (
        <div style={{ marginTop: '10px' }}>
            <h4>Origin Planet: {planet.name}</h4>
            <p>Population: {planet.population}</p>
            <p>Destroyed: {planet.isDestroyed ? "Yes" : "No"}</p>
        </div>
    );
};

export default Planet;
