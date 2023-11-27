import { useEffect, useState } from "react";
import ribbonImg from "../../../../public/images/big-ribbon.png"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AllMealsRow from "./AllMealsRow/AllMealsRow";
import { useQuery } from "@tanstack/react-query";

const AllMeals = () => {
    const axiosPublic = useAxiosPublic()
    const [page, setPage] = useState(0)
    const { data: meals = [], refetch } = useQuery({
        queryKey: ["allMeals"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals`)
            const data = await res.data;
            return data
        }
    })
    console.log(meals);
    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const numberOfPages = Math.ceil(meals.length / 10);
    console.log(numberOfPages);
    const pages = Number.isInteger(numberOfPages) && numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
    // const pages = [...Array(numberOfPages).keys()]
    console.log(pages);
    const startIndex = page * 10;
    const endIndex = startIndex + 10;
    const mealsToDisplay = meals.slice(startIndex, endIndex)

    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[260px]">All Meals</p>
            </div>
            <h1 className="text-xl font-bold text-center">Total Meal: {meals.length}</h1>
            <div className="flex flex-col p-5">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden max-w-5xl mx-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-[#aacc00]  font-bold text-white ">
                                    <tr className="text-center">
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Meal Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Number of likes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Number of Reviews
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Distributer Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Distributer Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Action(update)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Action(delete)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-center text-xs font-medium  uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        mealsToDisplay?.map((meal, i) => <AllMealsRow i={i} key={meal._id} meal={meal} refetch={refetch}></AllMealsRow>)
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

export default AllMeals;