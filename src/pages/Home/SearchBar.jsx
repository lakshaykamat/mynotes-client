import React, { useEffect } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, makeSearch }) => {


    useEffect(()=>{
        console.log(searchTerm)
        makeSearch()
    },[searchTerm])
    return (
        <div className="mx-5 mt-9  flex flex-col gap-3 max-w-xl sm:mx-auto">
            <h1 className="text-3xl font-semibold text-center">Search Note</h1>
            <div className="relative" >
                <input
                    type="text"
                    className="bg-gray-600 w-full px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring focus:bg-gray-500 text-white"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                        }
                    }
                />
                <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0-1a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
                            clipRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            d="M15.854 14.146l4.95 4.95-1.408 1.408-4.95-4.95 1.408-1.408z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                {/* <button
        className="absolute top-1/2 right-16 transform -translate-y-1/2 bg-blue-500 px-4 py-2 text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button> */}
            </div>
        </div>
    );
};

export default SearchBar;
