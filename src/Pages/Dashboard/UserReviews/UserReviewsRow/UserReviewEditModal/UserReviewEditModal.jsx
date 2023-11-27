
import { Rating } from '@smastrom/react-rating';
import { PropTypes } from 'prop-types';
import { useRef, useState } from 'react';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';


const UserReviewEditModal = ({review, showModal, setShowModal}) => {
    
    const { comment, _id} = review
    const axiosPublic = useAxiosPublic()
    const commentRef = useRef()
    const [ratings, setRatings] = useState(0)
    const handleSubmit = (e) => {
        
        e.preventDefault()
        const comment = commentRef.current.value
        if (ratings === 0) {
            return toast.error("Please Provide a rating")
        }
        // console.log(ratings, comment, rating, reviews);
        const updatedReview = {
            comment: comment,
            user_rating: ratings
        }
        axiosPublic.put(`reviews/${_id}`, updatedReview)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                toast.success("Review Update Successfully")
            }
        })
        
   
        

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
                                <textarea defaultValue={comment} ref={commentRef} className="textarea textarea-bordered h-24" placeholder="Write some word...."></textarea>
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
UserReviewEditModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    review: PropTypes.object,
    // reload: PropTypes.func
}

export default UserReviewEditModal;