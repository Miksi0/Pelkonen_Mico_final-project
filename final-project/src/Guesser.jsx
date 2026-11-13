import { gsap } from 'gsap';

function Guesser() {
    let pokeName = '';
    
    

    async function getPokemon() {
        let randomId = Math.floor(Math.random() * 1025) + 1; // Random ID between 1 and 1025
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            document.getElementById('pokemonNameDisplay').textContent = "???";
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonType').textContent = "Type: " + data.types.map(type => type.type.name.toUpperCase()).join(', ');
            pokeName = data.name.toUpperCase();

            document.getElementById('statHP').textContent = data.stats[0].base_stat;
            document.getElementById('statAttack').textContent = data.stats[1].base_stat;
            document.getElementById('statDefense').textContent = data.stats[2].base_stat;
            document.getElementById('statSpecialAttack').textContent = data.stats[3].base_stat;
            document.getElementById('statSpecialDefense').textContent = data.stats[4].base_stat;
            document.getElementById('statSpeed').textContent = data.stats[5].base_stat;
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
        }
        document.getElementById('pokemonImage').style.filter = 'brightness(0)'; // Hide the image
        document.getElementById('pokemonImage').style.backgroundColor = 'hsla(0, 0%, 73%, 0.27)'; // Set background color to light gray
        document.getElementById('resultMessage').textContent = "-";
        document.getElementById('resultMessage').style.color = "black";
        document.getElementById('guessInput').value = '';
    }
    getPokemon();

    function handleGuess() {
        document.getElementById('pokemonNameDisplay').textContent = pokeName;
        
        document.getElementById('pokemonImage').style.filter = 'brightness(1)'; // Show the image
        document.getElementById('pokemonImage').style.backgroundColor = 'hsla(0, 0%, 50%, 0.27)'; // Set background color to light gray
        const userGuess = document.getElementById('guessInput').value.toLowerCase();
        if (userGuess === pokeName.toLowerCase()) {
            document.getElementById('resultMessage').textContent = "Correct";
            document.getElementById('resultMessage').style.fontWeight = "bold"
            gsap.to('#resultMessage', {color: 'hsl(138, 100%, 68%)', duration: 3})
        }
        else {
            document.getElementById('resultMessage').textContent = "Incorrect";
            gsap.to('#resultMessage', {color: 'red', duration: 3})
            document.getElementById('resultMessage').style.fontWeight = "bold";
        }

    }

 
    return (
    <>
        <h2>PokeGuesser</h2>
        <p>Who's that Pokemon?</p>
        <div id="pokemonInfo" style={{ display: 'block' }}>
            <h3 id="pokemonNameDisplay">???</h3>
            <img id="pokemonImage" src="null" alt="" />
            <p id="pokemonType">Type: ???</p>
            <ol id="pokemonStats">
                <li>HP: <span id="statHP"></span></li>
                <li>Attack: <span id="statAttack"></span></li>
                <li>Defense: <span id="statDefense"></span></li>
                <li>Special Attack: <span id="statSpecialAttack"></span></li>
                <li>Special Defense: <span id="statSpecialDefense"></span></li>
                <li>Speed: <span id="statSpeed"></span></li>
            </ol>
        </div>
        <br />
        <input type="text" id="guessInput" placeholder="Enter your guess..." />
        <button id="guessButton" onClick={handleGuess}>Guess</button>
        <p id="resultMessage">-</p>
        <button onClick={getPokemon}>Retry</button>
        
    </>
    );
}

export default Guesser;