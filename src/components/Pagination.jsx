"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  }

  const paginationStyle = {
    display: "inline-flex",
    borderRadius: ".25rem",
    backgroundColor: "#2d2d2d",
    padding: ".5rem",
    gap: ".5rem",
  }

  const paginationButtonStyle = {
    padding: ".5rem 1rem",
    fontSize: ".875rem",
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "#404040",
    border: "none",
    borderRadius: ".25rem",
    cursor: "pointer",
    transition: "background-color .2s",
  }

  const paginationButtonDisabledStyle = {
    ...paginationButtonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  }

  const paginationTextStyle = {
    padding: ".5rem 1rem",
    fontSize: ".875rem",
    fontWeight: 500,
    color: "#fff",
  }

  return (
    <div style={paginationContainerStyle}>
      <nav style={paginationStyle}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? paginationButtonDisabledStyle : paginationButtonStyle}
          onMouseOver={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = "#4CAF50"
            }
          }}
          onMouseOut={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = "#404040"
            }
          }}
        >
          Anterior
        </button>
        <span style={paginationTextStyle}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? paginationButtonDisabledStyle : paginationButtonStyle}
          onMouseOver={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = "#4CAF50"
            }
          }}
          onMouseOut={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = "#404040"
            }
          }}
        >
          Siguiente
        </button>
      </nav>
    </div>
  )
}

export default Pagination

