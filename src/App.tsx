import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListarCartoes } from "./Components/listar_carotes";

function App() {
    
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route index path="/" />
            <Route path="/listar" element={< ListarCartoes />} />
          </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
