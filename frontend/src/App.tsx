import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />        {/* ← fora do Routes, aparece em todas as páginas */}
      <main>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/refueling" element={<div>Abastecimento</div>} />
          <Route path="/expense" element={<div>Gasto</div>} />
          <Route path="/history" element={<div>Histórico</div>} />
          <Route path="/vehicles" element={<div>Veículos</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;