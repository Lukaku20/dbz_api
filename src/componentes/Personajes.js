import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Planet from './Planet';  // 
import { Link } from 'react-router-dom'; //
import '../App.css'



const Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dragonball-api.com/api/characters?limit=10&page=${page}`);
                const dbzData = response.data.items;

                const detailedData = await Promise.all(
                    dbzData.map(async (character) => {
                        try {
                            const detailResponse = await axios.get(`https://dragonball-api.com/api/characters/${character.id}`);
                            return detailResponse.data;
                        } catch (error) {
                            console.error(`Error fetching details for character with ID ${character.id}:`, error);
                            return null;
                        }
                    })
                );

                const filteredData = detailedData.filter(character => character !== null);
                setPersonajes(prev => [...prev, ...filteredData]);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Hubo un problema al cargar los personajes.');
            }
        };

        fetchData();
    }, [page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const uniquePersonajes = personajes.filter((value, index, self) => 
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    );

    return (
        <div className="flex flex-wrap justify-center bg-[url('https://th.bing.com/th/id/R.231831d8bc0ae76b77546e5944ffd4d9?rik=trWpE%2fPMEcEwGw&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f35500000%2fDragon-Ball-Wallpaper-dragon-ball-35542008-1280-1024.jpg&ehk=mBcPOpljhNiO4yyCpQjj295NduPEh%2bllrsg%2fok3yFFQ%3d&risl=&pid=ImgRaw&r=0')]">
            {uniquePersonajes.map((char, index) => (
                <div 
                    key={index}
                    className="bg-gray-800 text-white rounded-lg shadow-lg m-4 p-6 w-80 text-center transform transition duration-500 hover:scale-105"
                >
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                        {char.name}
                    </h2>
                    <h3 className="text-lg mb-2">{char.race}</h3>
                    <h4 className="text-md mb-4">{char.affiliation}</h4>
                    <p className="text-sm mb-4">{char.description}</p>
                    <img src={char.image} alt={char.name} className="w-full h-auto mb-4 rounded-lg" />
                    <p className="mb-2">El ki que posee es: {char.ki}</p>
                    <p className="mb-4">Pero puede alcanzar: {char.maxKi}</p>
                    {char.originPlanet && (
                        <div className="mb-4">
                            <Planet planetId={char.originPlanet.id} />
                        </div>
                    )}
                    <Link to={`/planets/${char.originPlanet?.id}`} className="text-blue-400 hover:text-blue-200">
                        View Origin Planet
                    </Link>
                </div>
            ))}
            <button onClick={loadMore} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full mt-6 hover:bg-yellow-400">
                Load More
            </button>
        </div>
    );
};

export default Personajes;
