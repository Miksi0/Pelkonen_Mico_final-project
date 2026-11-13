function Search() {


    async function handleSearch() {
        try {
            const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            const data = await response.json();
            document.getElementById('pokemonNameDisplay').textContent = data.name.toUpperCase();
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonType').textContent = "Type: " + data.types.map(type => type.type.name.toUpperCase()).join(', ');
            document.getElementById('pokemonInfo').style.display = 'block';

            // Update stats
            document.getElementById('statHP').textContent = data.stats[0].base_stat;
            document.getElementById('statAttack').textContent = data.stats[1].base_stat;
            document.getElementById('statDefense').textContent = data.stats[2].base_stat;
            document.getElementById('statSpecialAttack').textContent = data.stats[3].base_stat;
            document.getElementById('statSpecialDefense').textContent = data.stats[4].base_stat;
            document.getElementById('statSpeed').textContent = data.stats[5].base_stat;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    return (
    <>
        <h2>Pokemon Search</h2>
        <input type="text" id="pokemonName" placeholder="Search for a Pokemon..." />
        <button id="searchButton" onClick={handleSearch}>Search</button>
        <p>Search for a Pokemon by its name or Pokedex number. ie. "pikachu" or "25"</p>

        <div id="pokemonInfo" style={{ display: 'none' }}>
            <h3 id="pokemonNameDisplay"></h3>
            <img id="pokemonImage" src="" alt="" />
            <p id="pokemonType"></p>
            <ol id="pokemonStats">
                <li>HP: <span id="statHP"></span></li>
                <li>Attack: <span id="statAttack"></span></li>
                <li>Defense: <span id="statDefense"></span></li>
                <li>Special Attack: <span id="statSpecialAttack"></span></li>
                <li>Special Defense: <span id="statSpecialDefense"></span></li>
                <li>Speed: <span id="statSpeed"></span></li>
            </ol>
        </div>
    </>
    );
}

export default Search;