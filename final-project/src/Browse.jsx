import { useState } from 'react';


function Browse() {
    
    const [index, setIndex] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    const [preload, setLoaded] = useState(false)
    
    async function getPokemonList() {
        for (let i = index; i < index + 10; i++) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
                const data = await response.json();
                setPokemonList(prevList => [...prevList, data.name.toUpperCase()]);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        }
        increment();
    }
    
    if(!preload){getPokemonList();
        setLoaded(true);
    }

    function increment(){
        setIndex(prevIndex => prevIndex + 10);
    }

    return (

        
        <>
            <div className="browse-container">
                <h2>Browse</h2>
                <p>Browse through the Pokedex</p>
                <div className="pokemon-list">
                    <ol>
                        {pokemonList.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ol>
                </div>
                <button onClick={getPokemonList}>Load more Pokemon</button>
            </div>
        </>
    );

}
export default Browse;