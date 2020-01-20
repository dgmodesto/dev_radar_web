import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
/*
 Componente
 - É uma função que retorna algum conteudo html, css ou javascript
 - Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
 Propriedades 
 - Informações que um componente PAI passa para o componte filho
 - Pode passar funções, strings, numeros, etc.
Estado
 - Informações mantidas pelo componente (Lembrar: Imutabilidade)
*/

function App() {
const [devs, setDevs] = useState([]);

async function handleAddDev(data) {
  const response = await api.post('/devs', data);

  setDevs([...devs, response.data]);

}

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm   onSubmit= {handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
