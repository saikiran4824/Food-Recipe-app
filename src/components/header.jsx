import React from "react";

export default function Header() {
  return (
    <div className="w-[85%]  flex md:flex-row flex-col gap-4 items-center justify-between p-4 ">
      <span className="text-[#FC8112] m-[-40px] font-bold text-[25px] ">
        R E C I P E R
      </span>

      <form className="flex items-center justify-between md:w-[25%] p-2 bg-slate-200 rounded-md">
        <input
          type="text"
          className="bg-inherit w-full h-8 rounded-lg px-3 "
          placeholder="Search your restaurant and food here"
        />
        <button type="submit" className="px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            className="text-slate-400 h-8"
            style={{ fill: "rgb(148, 163, 184)" }}
          >
            <path
              d="M13 3C7.4889971 3 3 7.4889971 3 13C3 18.511003 7.4889971 23 13 23C15.396508 23 17.597385 22.148986 19.322266 20.736328L25.292969 26.707031A1.0001 1.0001 0 1 0 26.707031 25.292969L20.736328 19.322266C22.148986 17.597385 23 15.396508 23 13C23 7.4889971 18.511003 3 13 3zM13 5C17.430123 5 21 8.5698774 21 13C21 17.430123 17.430123 21 13 21C8.5698774 21 5 17.430123 5 13C5 8.5698774 8.5698774 5 13 5z"
              className=""
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
