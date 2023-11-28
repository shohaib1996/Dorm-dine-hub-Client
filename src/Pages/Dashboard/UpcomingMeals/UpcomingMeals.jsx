import { useEffect, useState } from "react";
import ribbonImg from "../../../../public/images/big-ribbon.png"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UpcomingMealsRow from "./UpcomingMealsRow/UpcomingMealsRow";

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic()
    const [page, setPage] = useState(0)
    const { data: upcomingMeals = [], refetch } = useQuery({
        queryKey: ["upcomingMeals"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcoming-meals`)
            const data = await res.data;
            return data
        }
    })
    console.log(upcomingMeals);
    useEffect(() => {
        refetch();
    }, [page, refetch]);
    

    const numberOfPages = Math.ceil(upcomingMeals.length / 10);
    console.log(numberOfPages);
    const pages = Number.isInteger(numberOfPages) && numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
    const startIndex = page * 10;
    const endIndex = startIndex + 10;
    const mealsToDisplay = upcomingMeals.slice(startIndex, endIndex)
    
    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[220px]">Upcoming Meals</p>
            </div>
            <h1 className="text-3xl font-bold text-center">Total Upcoming Meals: {upcomingMeals.length}</h1>
            <div className="flex flex-col p-5">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-[#aacc00] font-bold text-white ">
                                    <tr className="text-center">
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            Meal Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            Likes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            Admin Name
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium  uppercase"
                                        >
                                            Meal Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium  uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                        mealsToDisplay?.map((meal, i) => <UpcomingMealsRow i={i} key={meal._id} meal={meal} refetch={refetch}></UpcomingMealsRow>)
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="mt-5 flex flex-row justify-center items-center space-x-3">
                            <button onClick={() => setPage(Math.max(page - 1, 0))} className="btn hover:bg-[#aacc00] hover:text-white">Prev</button>
                            {
                                pages?.map(p => <button
                                    onClick={() => setPage(p)}
                                    key={p}
                                    className={page == p ? "bg-[#aacc00] btn text-white btn-sm" : "btn-sm btn"}
                                >{p + 1}</button>)
                            }
                            <button onClick={() => setPage(Math.min(page + 1, pages.length - 1))} className="btn hover:bg-[#aacc00] hover:text-white">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMeals;