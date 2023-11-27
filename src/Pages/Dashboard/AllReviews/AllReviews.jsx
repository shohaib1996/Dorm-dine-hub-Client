import { useQuery } from "@tanstack/react-query";
import ribbonImg from "../../../../public/images/big-ribbon.png"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import AllReviewsRow from "./AllReviewsRow/AllReviewsRow";


const AllReviews = () => {
    const axiosPublic = useAxiosPublic()
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState("")
    // const [sortedReviews, setSortedReviews] = useState([])
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ["AllReviews", page, sortBy],
        queryFn: async () => {
            const res = await axiosPublic(`reviews?page=${page}&limit=10&sortBy=${sortBy}`)
            const data = await res.data
            return data
        }
    })
    console.log(allReviews);
    useEffect(() => {
        refetch();
    }, [page, refetch, sortBy]);

    const numberOfPages = Math.ceil(allReviews.count / 10);
    // console.log(numberOfPages);
    const pages = Number.isInteger(numberOfPages) && numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
    // const pages = [...Array(numberOfPages).keys()]
    console.log(pages);
    const handleSort = (e) => {
        e.preventDefault()
        const sortValue = e.target.value
        console.log(sortValue);
        setSortBy(sortValue)
        // axiosPublic.get(`/reviews?sortBy=${sortValue}`)
        // .then(res => {
        //     // console.log(res.data);
        // //    setSortedReviews(res.data.data);
            
        // })
        // .catch(error => {
        //     console.log(error);
        // })


    }

    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[260px]">All Reviews</p>
            </div>
            <p className="text-2xl font-bold text-center">Total Reviews: {allReviews.count}</p>
            <div className="p-5">
                <select onChange={handleSort} name="sort" className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Sort by likes and reviews</option>
                    <option value="likes">Sort by likes</option>
                    <option value="reviews">Sort by reviews</option>
                </select>
            </div>
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
                                            Number of likes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            Number of Reviews
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium  uppercase"
                                        >
                                            Action(Delete)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium  uppercase"
                                        >
                                            Action(Details)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                       allReviews?.data?.map((review, i) => <AllReviewsRow i={i} key={review._id} review={review} refetch={refetch}></AllReviewsRow>)
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

export default AllReviews;