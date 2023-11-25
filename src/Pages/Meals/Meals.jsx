
import { useRef, useState } from "react";
import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import useMeals from "../../hooks/useMeals";
import MealsCard from "../Home/MealsByCategory/MealsCard/MealsCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const Meals = () => {
    const axiosPublic = useAxiosPublic()
    const [meals] = useMeals()
    const [search, setSearch] = useState([])
    const searchRef = useRef()
    const handleSearch = () => {
        const searchResult = searchRef.current.value;
        searchRef.current.value = ""
        console.log(searchResult);
        axiosPublic.get(`/meals?search=${searchResult}`)
        .then(res => {
            setSearch(res.data); 
        })
    }
    const handleCategory = e => {
        e.preventDefault();
        const category = e.target.value;
        axiosPublic.get(`/meals?category=${category}`)
        .then(res => {
            setSearch(res.data);
        })
    };
    const handlePrice = e => {
        e.preventDefault()
        const priceSort = e.target.value;
        axiosPublic.get(`/meals?sort=${priceSort}`)
        .then(res => {
            setSearch(res.data);
        })
    }
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
                            <option  disabled selected>Filter In Price</option>
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
                       search.length > 0 ?  search.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>) :  meals.map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>)
                    }
                </div>
            </Container>

            <Footer></Footer>
        </div>
    );
};

export default Meals;