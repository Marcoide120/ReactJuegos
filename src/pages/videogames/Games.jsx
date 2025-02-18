import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllGames } from "../../service/games";

const Games = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            const { results, totalPages } = await fetchAllGames("", currentPage);
            setGames(results);
            setTotalPages(totalPages);
            setLoading(false);
        };
        loadGames();
    }, [currentPage]);

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(async () => {
            setLoading(true);
            const { results, totalPages } = await fetchAllGames(searchTerm, currentPage);
            setGames(results);
            setTotalPages(totalPages);
            setLoading(false);
        }, 500);

        setTimeoutId(newTimeoutId);

        return () => clearTimeout(newTimeoutId);
    }, [searchTerm, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <section className="p-5">
            <div className="flex justify-center items-center gap-6 mb-6">
                <h1 className="font-rubiksh text-green-600 font-extrabold text-4xl">
                    Biblioteca de juegos
                </h1>

                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    className="px-5 py-3 w-80 text-lg rounded-full border-2 border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-green-600 text-xl font-semibold animate-pulse">Cargando juegos...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {games.length > 0 ? (
                            games.map((game) => (
                                <Link to={`/gamesDetails/${game.id}`} key={game.id}>
                                    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                        <img
                                            src={game.background_image || "/placeholder.svg"}
                                            alt={game.name}
                                            className="w-full h-56 object-cover rounded-t-3xl"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-4 truncate">{game.name}</h3>
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-yellow-500 font-semibold">⭐ {game.rating}</p>
                                                <span className="bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                                    {game.released ? new Date(game.released).getFullYear() : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {game.genres &&
                                                    game.genres.slice(0, 3).map((genre) => (
                                                        <span
                                                            key={genre.id}
                                                            className="bg-gray-200 text-gray-800 text-xs font-medium px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
                                                        >
                                                            {genre.name}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 text-lg">No se encontraron juegos.</p>
                        )}
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-end mt-6">
                        <nav className="inline-flex rounded-md shadow-sm">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-green-600 bg-gray-800 border border-green-600 rounded-l-md hover:bg-green-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                            <span className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-t border-b border-green-600">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-medium text-green-600 bg-gray-800 border border-green-600 rounded-r-md hover:bg-green-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </section>
    );
};

export default Games;