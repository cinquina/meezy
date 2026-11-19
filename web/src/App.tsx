import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './home/main'
import { Admin } from './admin/main'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
