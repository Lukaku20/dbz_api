import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Personajes = () => {
    const [personaje, setPersonajes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primer llamado para obtener los personajes
                const response = await axios.get('https://dragonball-api.com/api/characters');
                const dbzData = response.data.items;  // Obtén el array de personajes

                // Si necesitas detalles adicionales para cada personaje
                const detailedData = await Promise.all(
                    dbzData.map(async (character) => {
                        try {
                            const detailResponse = await axios.get(`https://dragonball-api.com/api/characters/${character.id}`);  // Suponiendo que cada personaje tiene un ID
                            return detailResponse.data;
                        } catch (error) {
                            console.error(`Error fetching details for character with ID ${character.id}:`, error);
                            return null; // Retorna null si falla el fetch de detalles
                        }
                    })
                );

                // Filtrar cualquier null que pueda haber sido retornado en caso de error
                const filteredData = detailedData.filter(character => character !== null);
                setPersonajes(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Hubo un problema al cargar los personajes.');
            }
        };

        fetchData();
    }, []);


    return (

        <div>
            {personaje.map(char => (
                <div key={char.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{char.name}</h2>
                    <p>{char.description}</p>
                 
        
                </div>
            ))}
        </div>
    );
};

export default Personajes;
