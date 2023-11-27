import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { PropTypes } from 'prop-types';
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const AllMealsRow = ({ meal, i, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const { mealTitle, likes, reviews, adminName, admin_Email, _id } = meal
    const handleMealDelete = (id, mealTitle) => {
        console.log(id);
        axiosPublic.delete(`/meals/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch()
                    toast.success(`${mealTitle} has been deleted !!`)

                }
            })
    }
    return (
        <>
            <tr className=''>
                <td className="px-2 py-4  text-sm font-medium text-gray-800 dark:text-gray-200">
                    {i + 1}
                </td>
                <td className="px-2 py-4   text-xs font-medium text-gray-800 dark:text-gray-200">
                    {mealTitle}
                </td>
                <td className="px-2 py-4  text-xs text-gray-800 dark:text-gray-200">
                    {likes}
                </td>
                <td className="px-2 py-4  text-xs text-gray-800 dark:text-gray-200">
                    {reviews}
                </td>
                <td className="px-2 py-4  text-xs text-gray-800 dark:text-gray-200">
                    {adminName}
                </td>
                <td className="px-2 mx-auto py-4  text-xs text-gray-800 dark:text-gray-200">
                    {admin_Email}
                </td>
                <td className="px-2 py-4  text-end text-sm font-medium">
                    <Link to={`/dashboard/update-meal/${_id}`}>
                        <button
                            type="button"
                            className="btn bg-[#aacc00] btn-sm hover:bg-[#ddf565] rounded-md"
                        >
                            <FaPenAlt className="text-lg text-white"></FaPenAlt>
                        </button>
                    </Link>
                </td>
                <td className="px-2 py-4  btn-sm text-end text-sm font-medium">
                    <button
                        onClick={() => handleMealDelete(_id, mealTitle)}
                        type="button"
                        className="btn text-white btn-sm bg-red-600 hover:bg-red-800"
                    >
                        <FaTrashAlt className="text-lg text-white"></FaTrashAlt>
                    </button>
                </td>
                <td className="px-2 py-4  btn-sm text-end text-sm font-medium">
                    <Link to={`/meal/${_id}`}>
                        <button className="bg-green-500 btn hover:bg-[#aacc00] rounded-md px-1 btn-sm">Details</button>
                    </Link>
                </td>
            </tr>
        </>
    );
};
AllMealsRow.propTypes = {
    meal: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func

}

export default AllMealsRow;