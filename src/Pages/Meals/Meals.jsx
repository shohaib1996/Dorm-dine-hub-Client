

import { useEffect, useRef, useState } from "react";
import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import useMeals from "../../hooks/useMeals";
import MealsCard from "../Home/MealsByCategory/MealsCard/MealsCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import InfiniteScroll from "react-infinite-scroll-component";





const Meals = () => {
    const axiosPublic = useAxiosPublic();
    const [meals] = useMeals();
    const [searchResult, setSearchResult] = useState('');
    const searchRef = useRef();
    const [page, setPage] = useState(1);
    const startIndex = page * 8;
    const endIndex = startIndex + 8;
    const [mealsToDisplay, setMealsToDisplay] = useState(meals.slice(startIndex, endIndex))
    const { data: search = [], refetch } = useQuery({
        queryKey: ["searchResult", searchResult],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals${searchResult}`)
            const data = await res.data
            return data
        }
    })
    // const { data: mealsToDisplay = [] } = useQuery({
    //     queryKey: ["searchResult", searchResult],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/meals?page=${page}&limit=8`)
    //         const data = await res.data
    //         return data
    //     }
    // })
    console.log(page);
    console.log(mealsToDisplay);

    useEffect(() => {
        refetch()
    }, [searchResult, refetch])


    const handleScroll = () => {
        setTimeout(() => {
          if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
          ) {
            setPage((prevPage) => prevPage + 1);
          }
        }, 1500);
      };

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);


        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener("scroll", handleScroll);
        };


    }, [page]);


    useEffect(() => {
        // Update mealsToDisplay whenever the page or meals array changes
        const newStartIndex = page * 8;
        const newEndIndex = newStartIndex + 8;
        setMealsToDisplay(prev => [...prev, ...meals.slice(newStartIndex, newEndIndex)]);
    }, [page, meals]);

    // console.log(meals);
    const handleSearch = () => {
        const searchResult = searchRef.current.value;
        searchRef.current.value = "";
        setSearchResult(`?search=${searchResult}`);
    };

    const handleCategory = (e) => {
        e.preventDefault();
        const category = e.target.value;
        setSearchResult(`?category=${category}`);
    };

    const handlePrice = (e) => {
        e.preventDefault();
        const priceSort = e.target.value;
        setSearchResult(`?sort=${priceSort}`);
    };
    // const [mealsToDisplay, setMealsToDisplay] = useState([]);
    // useEffect(() => {
    //     const startIndex = page * 8;
    //     const endIndex = startIndex + 8;
    //     const mealsPerScroll = meals.slice(startIndex, endIndex);
    //     setMealsToDisplay(mealsPerScroll);
    // }, [meals, page]);

    // const mealsPerScroll = meals.slice(startIndex, endIndex);
    // const [mealsToDisplay, setMealsToDisplay] = useState(mealsPerScroll);

    // console.log(mealsToDisplay);

    // const fetchMoreData = () => {
    //     setTimeout(() => {
    //         setPage((prev) => prev + 1);
    //         setMealsToDisplay((prevMealsToDisplay) => [
    //             ...prevMealsToDisplay,
    //             ...meals.slice(startIndex, endIndex),
    //         ]);
    //     }, 1500);


    // }

    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="flex justify-center items-center flex-row my-8">
                    <div className="join">
                        <div>
                            <div>
                                <input ref={searchRef} className="input w-[400px] input-bordered join-item" placeholder="Search" />
                            </div>
                        </div>
                        <select onChange={handleCategory} name="category" className="select select-bordered join-item">
                            <option disabled selected>Category</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        <select onChange={handlePrice} name="price" className="select select-bordered join-item">
                            <option disabled selected>Filter In Price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                            <option value="lt10">Less Than $10</option>
                            <option value="gt10">Greater Than $10</option>
                        </select>
                        <div className="indicator">
                            <button onClick={handleSearch} className="btn join-item bg-[#aacc00] hover:bg-[#bcf356] text-white font-bold">Search</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-7">
                    {
                        search.length > 0 ? search.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>) : mealsToDisplay.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>)
                    }
                </div>

            </Container>

            <Footer></Footer>
        </div>
    );
};

export default Meals;




