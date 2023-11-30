
import { PropTypes } from 'prop-types';
// import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsersRow = ({ user, i, refetch }) => {
    const axiosSecure = useAxiosSecure()
    // const axiosPublic = useAxiosPublic()
    const { badge_image, badge, name, email, _id, role } = user

    const handleMakeAdmin = id => {
        console.log(user);
        const updateRole = {
            role: 'admin'
        }
        axiosSecure.patch(`/users/admin/${id}`, updateRole)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success(`${name} is now admin!!`)
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
                    {name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {badge} <span><img className='w-12 h-12' src={badge_image} alt="" /></span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">

                    <button
                        onClick={() => handleMakeAdmin(_id)}
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        {role == 'admin' ? "Admin": "Make Admin"}
                    </button>

                </td>
            </tr>
        </>
    );
};
ManageUsersRow.propTypes = {
    user: PropTypes.object,
    i: PropTypes.number,
    refetch: PropTypes.func

}

export default ManageUsersRow;