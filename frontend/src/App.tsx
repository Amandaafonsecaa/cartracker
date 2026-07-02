import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/refueling" element={<div>Abastecimento</div>} />
          <Route path="/expense" element={<div>Gasto</div>} />
          <Route path="/history" element={<div>Histórico</div>} />
          <Route path="/vehicles" element={<div>Veículos</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;