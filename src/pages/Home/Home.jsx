import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);

  return (
    <>
      <section
        className="w-full mb-6 py-12 md:py-20 lg:py-28 xl:py-36 flex items-center justify-center"
        style={{
          backgroundImage: "url('/portada.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
             La Juegoteca
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-300">
              La mejor información sobre videojuegos
            </p>
          </div>
          <div className="space-x-4 mt-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-green-300 px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-green-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              to="/Games"
            >
              Adéntrate en el universo virtual
            </Link>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h1 className="font-rubiksh text-3xl text-green-600 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
         Los más recientes
        </h1>
        <div className="h-96 mb-2 mt-6 sm:h-64 xl:h-80 2xl:h-96">
          {/* Aquí puedes insertar tu carrusel */}
          {/* Ejemplo:
          <Carousel slideInterval={2000} className="mb-3 mt-3">
            {films.map((film, index) => (
              <div key={index} className="text-center">
                <img src={film.image} alt={film.title} />
                <p>{film.title}</p>
              </div>
            ))}
          </Carousel> */}
        </div>
      </section>
    </>
  );
}

export default Home;
