

const Banner = () => {
    return (
        <div className="space-y-5">
            <h1 className="text-4xl font-bold text-[#99582a]">Elevating Your University Experience with Premium Hostel Living and Delectable Dining!</h1>
            <p>Embark on a journey of comfort and flavor at DormDineHub. We redefine student living by seamlessly blending cozy dormitories with a culinary haven. Explore our state-of-the-art facilities, relish delicious meals, and make the most of your university years with DormDineHub – Where Every Day Feels Like Home.</p>
            <div className="relative w-full max-w-md">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos, Design Templates..."
                    required=""
                />
                <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#99582a] rounded-e-lg border border-[#99582a] hover:bg-[#ee9658] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#99582a] dark:focus:ring-[#ee9658]"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>

        </div>
    );
};

export default Banner;