import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (pageNumber) => {
    // Fetch new data (via paginate)
    paginate(pageNumber);
    // Scroll to the top
    scrollToTop();
  };

  return (
    <nav className="w-full p-4">
      <ul className="pagination  flex-wrap justify-end flex gap-2 ">
        {/* Previous button */}
        <li
          className={`flex page-item border-orange-500 bg-[#FC8112] text-white text-lg font-bold border-2 rounded-md text-center w-8 h-8 ${
            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          disabled={currentPage <= 1}
        >
          <a href="#!" className="m-auto ">
            <FaArrowLeft />
          </a>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item border-orange-500 bg-[#FC8112] text-lg font-bold border-2 rounded-md text-center w-8 h-8 ${
              number === currentPage
                ? "text-white"
                : "text-[#FC8112] bg-white border-2"
            }`}
          >
            <a
              onClick={() => handlePageChange(number)}
              href="#!"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}

        {/* Next button */}
        <li
          className={`flex page-item border-orange-500 bg-[#FC8112] text-white text-lg font-bold border-2 rounded-md text-center w-8 h-8 ${
            currentPage >= Math.ceil(totalPosts / postsPerPage)
              ? "pointer-events-none opacity-50"
              : ""
          }`}
          onClick={() => {
            if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
              handlePageChange(currentPage + 1);
            }
          }}
          disabled={currentPage >= Math.ceil(totalPosts / postsPerPage)}
        >
          <a href="#!" className="m-auto ">
            <FaArrowRight />
          </a>
        </li>
      </ul>
    </nav>
  );
}
