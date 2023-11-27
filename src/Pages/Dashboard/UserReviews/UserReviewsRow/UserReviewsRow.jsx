
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import UserReviewEditModal from './UserReviewEditModal/UserReviewEditModal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';


const UserReviewsRow = ({ review, i, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const [showModal, setShowModal] = useState(false)
    const { mealTitle, likes, reviews, food_id, _id } = review
    const handleDelete = id => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosPublic.delete(`/reviews/${id}`)
              .then(res => {
                console.log(res.data)
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
              })
            }
          });

    }
    return (
        <>
            <tr className=''>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {i + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {mealTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {likes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {reviews}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        <FaUserEdit className='text-3xl'></FaUserEdit>
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                        onClick={()=> handleDelete(_id)}
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 p-1 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        <FaTrashAlt className='text-3xl text-white'></FaTrashAlt>
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <Link to={`/meal/${food_id}`}>
                        <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                            Details
                        </button>
                    </Link>
                </td>
            </tr>
            <UserReviewEditModal showModal={showModal} setShowModal={setShowModal} review={review}></UserReviewEditModal>
        </>
    );
};
UserReviewsRow.propTypes = {
    review: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func
}

export default UserReviewsRow;