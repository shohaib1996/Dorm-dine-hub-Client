
import { PropTypes } from 'prop-types';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const UpcomingMealsRow = ({ meal, i, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const { _id, mealTitle, mealType, ingredients, mealImage, description, price, rating, timeDate, likes, reviews, adminName, admin_Email } = meal
    const publishedMeal = {
        mealTitle, mealType, ingredients, mealImage, description, price, rating, timeDate, likes, reviews, adminName, admin_Email 
    }
    const handlePublished = (id, mealTitle, likes) => {
        if(!(likes >= 10)){
           return toast.error("You have to at-least 10 likes for publish!!")
        }
        console.log(id, mealTitle);
        console.log(publishedMeal);
        axiosPublic.post('/meals', publishedMeal)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                refetch()
                toast.success(`${mealTitle} is now published`)
            }
        })
        axiosPublic.delete(`/upcoming-meals/${id}`)
        .then(res => {
            
            console.log(res.data);
            refetch()
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
                    {adminName}
                </td>

                <td className="px-2 py-4  text-end text-sm font-medium">
                    {mealType}
                </td>
                <td className="px-2 py-4  btn-sm text-end text-sm font-medium">
                    <button onClick={() => handlePublished(_id, mealTitle, likes)} className="btn btn-active btn-accent">Publish</button>
                </td>

            </tr>
        </>
    );
};
UpcomingMealsRow.propTypes = {
    meal: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func

}
export default UpcomingMealsRow;