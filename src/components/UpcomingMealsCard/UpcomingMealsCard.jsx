
import { PropTypes } from 'prop-types';
import priceTag from "../../../public/images/vecteezy_red-banner-clipart-design-illustration_9342624.png"
import likeImg1 from "../../../public/images/like_png_2-removebg-preview (1).png"
import likeImg2 from "../../../public/images/like_png-removebg-preview.png"
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpcomingMealsCard = ({ meal, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const { mealTitle, mealImage, price, likes, mealType, _id, liked } = meal
    const [like, setLike] = useState(false)
    useEffect(() => {
        if(liked.includes(user?.email)){
            setLike(true)
        }
        else{
            setLike(false)
        }
    }, [ liked, user?.email])
    const handleLike = (id) => {
        const updatedMealData = {liked: [...liked], likes: likes + 1}
        if (!user) {
            toast.error('Please Login first to like')
        } else {
            updatedMealData.liked.push(user.email)
            axiosPublic.put(`/upcoming-meals/${id}`, updatedMealData)
                .then(res => {
                    refetch()
                    console.log(res.data.modifiedCount)
                    if (res.data.modifiedCount > 0) {
                        toast.success('You Liked This Meal!!')
                    }
                })
                .catch(error => {
                    console.error(error);
                })

        }
    }
    const handleUnLike = (id) => {
        Swal.fire({
            title: "Do you want to Unlike?",
            text: "You can be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Un Liked it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const newLikedArr = liked.filter(email => email !== user?.email)
                axiosPublic.put(`/upcoming-meals/${id}`, { liked:  newLikedArr, likes: likes - 1 })
                    .then(res => {

                        console.log(res.data.modifiedCount)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Un Liked!",
                                text: "You Can Like again",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        });

    }
    return (
        <div className="flex flex-col border-4 transform transition-transform duration-300 hover:border-[#aacc00] bg-white shadow-sm rounded-xl relative dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className='relative'>
                <img
                    className="w-full h-[250px] rounded-t-xl object-cover"
                    src={mealImage}
                    alt="Image Description"
                />
                <p className='bg-[#aacc00] p-2 rounded-lg text-white absolute top-0 font-bold'>{mealType}</p>

            </div>
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold h-[50px] text-gray-800 dark:text-white">
                    {mealTitle}
                </h3>
                <div className='flex items-center'>
                    <div>
                    {
                                        like && user ? <img onClick={() => handleUnLike(_id)} className="w-20 h-12 btn hover:bg-transparent border-none bg-transparent" src={likeImg2} alt="" /> : <img onClick={()=> handleLike(_id)} className="w-20 h-12 btn hover:bg-transparent border-none bg-transparent" src={likeImg1} alt="" />

                                    }
                    </div>
                    <p>({likes})</p>
                </div>

            </div>
            <div className='absolute -right-1 top-[85%]'>
                <div className='relative'>
                    <img className='w-20 h-12' src={priceTag} alt="" />
                    <p className='absolute top-3 left-3 text-white font-bold'>${price}</p>
                </div>
            </div>
        </div>
    );
};
UpcomingMealsCard.propTypes = {
    meal: PropTypes.object,
    // i: PropTypes.number,
    refetch: PropTypes.func

}

export default UpcomingMealsCard;