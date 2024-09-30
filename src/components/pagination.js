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

  return (
    <nav className="w-full p-4">
      <ul className="pagination  flex-wrap justify-end flex gap-2 ">
        {/* Previous button */}
        <li
          className={`flex page-item border-orange-500 bg-[#FC8112] text-white text-lg font-bold border-2 rounded-md text-center w-8 h-8 ${
            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
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
            <a onClick={() => paginate(number)} href="#!" className="page-link">
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
          onClick={() => paginate(currentPage + 1)}
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
