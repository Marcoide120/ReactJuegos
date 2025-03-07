import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Games from "./pages/videogames/Games"
import GamesDetails from "./pages/GamesDetails/GamesDetails"
import Genero from "./pages/generos/Genero"
import Publishers from "./pages/publisher/Publisher"
import PublisherDetails from "./pages/publisherDetails/PublisherDetails"
import Tags from "./pages/tags/Tags"

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:id" element={<GamesDetails />} />
            <Route path="/games/:type/:id" element={<Genero />} />
            <Route path="/publisher" element={<Publishers />} />
            <Route path="/publisher/:id" element={<PublisherDetails />} />
            <Route path="/tags" element={<Tags />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

