
import { PropTypes } from 'prop-types';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ServeMealsRow = ({meal, i, refetch}) => {
    const axiosPublic = useAxiosPublic()
    const {mealTitle, user_name, user_email, status, _id} = meal
    const handleServe = id => {
        console.log(id);
        if(status === "delivered"){
            return toast.error("Meal is already delivered")
        }
        const updateStatus = {
            status: 'delivered'
        }
        axiosPublic.patch(`/request-meals/${id}`, updateStatus)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success(`${mealTitle} is successfully delivered`)
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
                    {user_email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {user_name}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                {
                    status == 'delivered' ? <button className="btn btn-accent btn-sm text-white bg-[#aacc00]">Delivered</button> : 
                    <button className="btn btn-accent btn-sm">{status}</button>
                }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    
                <button onClick={() => handleServe(_id)} className="btn btn-outline btn-accent btn-sm">Serve</button>
                    
                </td>
            </tr>
    
        </>
    );
};
ServeMealsRow.propTypes = {
    meal: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func

}

export default ServeMealsRow;