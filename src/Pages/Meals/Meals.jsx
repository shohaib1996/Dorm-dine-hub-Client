

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
    // const [page, setPage] = useState(0)
    // const [data, setData] = useState([])


    // useEffect(() => {
    //     axiosPublic.get(`http://localhost:5000/meals?page=${page}&limit=4`)
    //         .then(res => {
    //             console.log(res.data);
    //             setData(prev => [...prev, ...res.data])
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, [page, axiosPublic])
    // const handleScroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
    //         setPage(prev => prev + 1)
    //     }
    // }
    // console.log(page);
    // console.log(data);



    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll)
    //     return () => window.removeEventListener("scroll", handleScroll)
    // }, [])





    const { data: search = [], refetch } = useQuery({
        queryKey: ["searchResult", searchResult],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals${searchResult}`)
            const data = await res.data
            return data
        }
    })


    useEffect(() => {
        refetch()
    }, [searchResult, refetch])

   



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





    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="flex justify-center items-center flex-row my-8">
                    <div className="join w-[400px] mx-auto lg:w-full flex-col lg:flex-row justify-center gap-3 lg:gap-0">
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


                <div className="grid grid-cols-1 md:grid-cols-2 p-5 lg:p-0 lg:grid-cols-4 gap-7">
                    {
                        search.length > 0 ? search.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>) : meals.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>)
                    }
                </div>



            </Container>

            <Footer></Footer>
        </div>
    );
};

export default Meals;




