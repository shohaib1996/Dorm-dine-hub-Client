
import { PropTypes } from 'prop-types';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';


const RequestedMealsRow = ({meal, i, refetch}) => {
    const axiosPublic = useAxiosPublic()
    const {mealTitle, likes, reviews, status, _id} = meal
    const handleCancel = (id, mealTitle) => {
        console.log(id, mealTitle);
        axiosPublic.delete(`/request-meals/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.deletedCount > 0){
                refetch()
                toast.success(`${mealTitle} is canceled`)
            }
        })
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
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        {status}
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                        onClick={()=> handleCancel(_id, mealTitle)}
                        type="button"
                        className="btn text-white btn-sm bg-red-600 hover:bg-red-800"
                    >
                        {status === 'pending' ? "Cancel" : "Delete"}
                    </button>
                </td>
            </tr>
        </>
    );
};
RequestedMealsRow.propTypes = {
    meal: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func
}
export default RequestedMealsRow;