import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPublishers } from "../../service/publishers";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPublishers = async () => {
      setLoading(true);
      const { results, totalPages } = await fetchAllPublishers("", currentPage);
      setPublishers(results);
      setTotalPages(totalPages);
      setLoading(false);
    };
    loadPublishers();
  }, [currentPage]);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(async () => {
      setLoading(true);
      const { results, totalPages } = await fetchAllPublishers(searchTerm, currentPage);
      setPublishers(results);
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
          Biblioteca de Publishers
        </h1>
        <input
          type="text"
          placeholder="Buscar publishers..."
          className="px-5 py-3 w-80 text-lg rounded-full border-2 border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-green-600 text-xl font-semibold animate-pulse">Cargando publishers...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publishers.length > 0 ? (
              publishers.map((publisher) => (
                <Link 
                  key={publisher.id} 
                  to={`/publishers/${publisher.id}`}
                  className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl p-6 block hover:bg-gray-800 transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 truncate">
                    {publisher.name}
                  </h3>
                  <p className="text-gray-400">Juegos publicados: {publisher.games_count}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400 text-lg">No se encontraron publishers.</p>
            )}
          </div>
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

export default Publishers;
