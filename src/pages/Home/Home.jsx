import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = "b2685e103fb743d09dc5325f1174937d";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    

  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [games]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-white text-2xl">Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-600 min-h-screen">
      <section
        className="w-full mb-6 py-12 md:py-20 lg:py-28 xl:py-36 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/portada.jpeg')" }}
      >
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              La Juegoteca virtual
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              La mejor información sobre videojuegos
            </p>
          </div>
          <div className="space-x-4 mt-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              to="/Games"
            >
              Adéntrate en el universo virtual
            </Link>
          </div>
        </div>
      </section>

      <section className="text-center px-4 py-12">
        <h2 className="font-rubiksh text-3xl text-green-400 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
          Los más recientes
        </h2>

        <div className="relative max-w-7xl mx-auto">
  <div className="overflow-hidden rounded-xl shadow-xl">
    <div className="relative h-96 sm:h-[500px] md:h-[600px] transition-transform duration-700 ease-in-out transform" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {games.map((game, index) => (
        <div key={game.id} className="absolute top-0 left-0 w-full h-full" style={{ left: `${index * 100}%` }}>
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black opacity-70 p-6 rounded-b-xl">
            <h3 className="text-white text-3xl font-semibold mb-3">{game.name}</h3>
            <p className="text-gray-100 text-lg">{game.released}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

</div>


        <div className="flex justify-center mt-4 space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

