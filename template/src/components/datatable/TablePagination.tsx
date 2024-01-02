type TablePaginationProps = {
  start: number;
  itemsCount: number;
  paginatedData: any[];
  pagesCount: number;
  currentPage: number;
  navigate: (page: number) => void;
};

const TablePagination = ({
  start,
  currentPage,
  itemsCount,
  navigate,
  pagesCount,
  paginatedData,
}: TablePaginationProps) => {
  return (
    <div className="datatable-bottom">
      <p>
        Showing {start + 1} to {start + paginatedData.length} of {itemsCount}{" "}
        entries
      </p>
      {pagesCount > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li
              className="page-item page-link"
              onClick={() => {
                navigate(currentPage - 1);
              }}
            >
              Previous
            </li>
            {pagesCount > 8 && (
              <>
                <li
                  className={
                    "page-item page-link" + (currentPage === 1 ? " active" : "")
                  }
                  onClick={() => navigate(1)}
                >
                  1
                </li>
                <li
                  className={
                    "page-item page-link" + (currentPage === 2 ? " active" : "")
                  }
                  onClick={() => navigate(2)}
                >
                  2
                </li>
                {(currentPage < 3 || currentPage > pagesCount - 2) && (
                  <li className="page-item page-link">...</li>
                )}
                {currentPage >= 3 && currentPage <= pagesCount - 2 && (
                  <li className="page-item active page-link">{currentPage}</li>
                )}
                <li
                  className={
                    "page-item page-link" +
                    (currentPage === pagesCount - 1 ? " active" : "")
                  }
                  onClick={() => navigate(pagesCount - 1)}
                >
                  {pagesCount - 1}
                </li>
                <li
                  className={
                    "page-item page-link" +
                    (currentPage === pagesCount ? " active" : "")
                  }
                  onClick={() => navigate(pagesCount)}
                >
                  {pagesCount}
                </li>
              </>
            )}
            {pagesCount <= 8 && (
              <>
                {Array.from(Array(pagesCount).keys()).map((page, index) => (
                  <li
                    key={"page-item-" + index}
                    className={
                      "page-item page-link" +
                      (currentPage === page + 1 ? " active" : "")
                    }
                    onClick={() => navigate(page + 1)}
                  >
                    {page + 1}
                  </li>
                ))}
              </>
            )}
            <li
              className="page-item page-link"
              onClick={() => navigate(currentPage + 1)}
            >
              Next
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TablePagination;
