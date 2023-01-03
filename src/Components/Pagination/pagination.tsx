import { PaginationProps } from "../../config/types";
import "./pagination.css";

const Pagination = ({
    numberOfEnterprises,
    enterprisesPerPage,
    setCurrentPage,
    currentPage,
}: PaginationProps) => {
  let pages = []
  window.scroll(0, 0);
  for (let i = 1; i <= Math.ceil(numberOfEnterprises / enterprisesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((onePage, id) => {
        return (
          <button
            key={id}
            onClick={() => setCurrentPage(onePage)}
            className={onePage === currentPage ? "active-page" : ""}
          >
            {onePage}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
