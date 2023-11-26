
import { Rating } from '@smastrom/react-rating';
import { PropTypes } from 'prop-types';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useMeals from '../../../hooks/useMeals';

const ReviewModal = ({ showModal, setShowModal, meal, reload }) => {
    const [, refetch] = useMeals()
    const {user} = useAuth()
    const { rating, reviews, mealTitle, likes, _id } = meal
    const [ratings, setRatings] = useState(0)
    const commentRef = useRef()
    const axiosPublic = useAxiosPublic()
    const handleSubmit = (e) => {
        
        e.preventDefault()
        const comment = commentRef.current.value
        if (ratings === 0) {
            return toast.error("Please Provide a rating")
        }
        console.log(ratings, comment, rating, reviews);
        const newRating = parseFloat((((rating * reviews) + ratings) / (reviews + 1)).toFixed(1))
        // const updatedRating = Math.round(newRating)
        const updatedMeal = {
            rating: newRating,
            reviews: reviews + 1
        }
        const reviewData = {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            mealTitle,
            likes,
            reviews: reviews + 1,
            comment: comment,
            user_rating : ratings,
            food_id: _id
        }
        // console.log(reviewData);
        axiosPublic.post("/reviews", reviewData)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                reload()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank for Your reviews!!!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        .catch(error => {
            console.error(error);
        })
        axiosPublic.patch(`/meals/${_id}`, updatedMeal)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                // toast.success("meal updated")
            }
        })
        .catch(error => {
            console.error(error);
        })
        setShowModal(false)
        

    }
    return (
        <>
            {
                showModal && <dialog id="my_modal_3" className="modal" open>
                    <div className="modal-box">
                        <form method="dialog">
                            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white font-bold border-none">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Please Make Review</h3>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Comment Here!!</span>
                                </label>
                                <textarea ref={commentRef} className="textarea textarea-bordered h-24" placeholder="Write some word...."></textarea>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='my-5'><Rating halfFillMode='svg' style={{ maxWidth: 180 }} value={ratings} onChange={setRatings} /></p>
                                <button onClick={handleSubmit} className='btn bg-[#aacc00] text-white font-bold hover:bg-[#d7f05a] border-none'>Submit</button>
                            </div>

                        </div>
                    </div>
                </dialog>
            }
        </>
    );
};
ReviewModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    meal: PropTypes.object,
    reload: PropTypes.func
}

export default ReviewModal;