import { useState } from 'react'
import { gsap } from 'gsap';
import './App.css'
import Search from './Search.jsx' 
import Guesser from './Guesser.jsx'
import Browse from './Browse.jsx'

function App() {

  const guesserComponent = <Guesser />;
  const searchComponent = <Search />;
  const BrowseComponent = <Browse />;
  

  const [currentComponent, setCurrentComponent] = useState(guesserComponent);

  
  return (
    <>
      <div id="main-content">
        {currentComponent}
      </div>

      <div class="sidebar">
        <h2>PokeGuesser</h2>
        
        <button onClick={() => setCurrentComponent(guesserComponent)}>Guess</button>
        <button onClick={() => setCurrentComponent(searchComponent)}>Search</button>
        <button onClick={() => setCurrentComponent(BrowseComponent)}>Browse</button>
      </div>
    
      
    </>
  )
}

export default App
