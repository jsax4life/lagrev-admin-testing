
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import Lucide from "../Lucide";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  visiblePages?: number; // Default to 5 pages visible at a time

}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
  visiblePages = 5, // Default to showing 5 pages

}: PaginationProps) {
  if (totalPages <= 1) return null; // Hide if only 1 page

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);


  // const handlePageClick = (page: number) => {
  //   if (page >= 1 && page <= totalPages && page !== currentPage) {
  //     onPageChange(page);
  //   }
  // };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className={twMerge("w-full sm:w-auto sm:mr-auto", className)}>
            <ul className="flex w-full mr-0 sm:w-auto sm:mr-auto">
              
              
            {currentPage > 1 && (
                <Pagination.Link
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
                >
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Pagination.Link>
                  )}

                {/* First Page Button */}
      {currentPage > 1 && (
        <Pagination.Link  
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        >
           <Lucide icon="ChevronsLeft" className="w-4 h-4" />
         </Pagination.Link>
      )}

      {/* Previous Button */}
      {/* {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)}>Prev</Button>
      )} */}

                <Pagination.Link>...</Pagination.Link>
           
                 {/* Page Numbers */}
      {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Pagination.Link
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Link>
      ))} */}

 {/* Page Numbers */}
 {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
        (page) => (
          <Pagination.Link
            key={page}
            className={twMerge(
              "px-3 py-1 border rounded-md",
              page === currentPage ? "bg-customColor text-white" : "bg-gray-200"
            )}
            onClick={() => handlePageClick(page)}
          >
            {page}
        </Pagination.Link>
        )
      )}


                <Pagination.Link>...</Pagination.Link>


                
                 {/* Next Button */}
      {currentPage < totalPages && (
      <Pagination.Link
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
      </Pagination.Link>
      )}

      {/* Last Page Button */}
      {currentPage < totalPages && (
                <Pagination.Link
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(totalPages)}
                >
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </Pagination.Link>
              )}
            
            
            </ul>

      {/* Previous Button */}
      {/* <Pagination.Link
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Prev
      </Pagination.Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Pagination.Link
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Link>
      ))}

      <Pagination.Link
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
      </Pagination.Link> */}

 
    </nav>
  );
}

// Reusable Pagination Link
interface LinkProps extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

Pagination.Link = ({ active, className, children, ...props }: LinkProps) => {
  return (
    <li className="flex-1 sm:flex-initial">
      <Button
      className={twMerge(
        // "px-3 py-1 rounded-md border transition-all text-sm",
        // active ? "bg-blue-600 text-white font-medium" : "bg-gray-200 text-gray-700 hover:bg-gray-300",

      
        "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
        active && "!box  font-medium dark:bg-darkmode-400",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </Button>
    </li>
  );
 
};
