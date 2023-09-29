import './App.css';
import { Formulario } from './components/Formulario';
import { Home } from './routes/Home';
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState([]);

  return (
    <>
      <div className='App'>
        {!user.length > 0 
        ? <Formulario setUser={setUser} />
        : <Home user={user} setUser={setUser} />}
      </div>
    </>
  )
};

export default App;