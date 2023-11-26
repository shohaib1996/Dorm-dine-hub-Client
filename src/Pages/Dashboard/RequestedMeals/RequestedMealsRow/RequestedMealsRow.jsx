
import { PropTypes } from 'prop-types';


const RequestedMealsRow = ({meal, i}) => {
    const {mealTitle, likes, reviews, status} = meal
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
            </tr>
        </>
    );
};
RequestedMealsRow.propTypes = {
    meal: PropTypes.object,
    i: PropTypes.number
}
export default RequestedMealsRow;