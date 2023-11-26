
import { Rating } from '@smastrom/react-rating';
import { PropTypes } from 'prop-types';
import { SiFoodpanda } from "react-icons/si";

const ReviewsCard = ({ review}) => {
   const {user_rating, name, comment, image} = review
    return (
        <div >
            <div className="flex justify-center gap-10 border-2 rounded-md p-3">
                <img
                    className="h-[2.375rem] w-[2.375rem] rounded-full"
                    src={image}
                    alt="Image Description"
                />
                <div className="ms-3">
                    <h3 className="group-hover:text-blue-600 uppercase font-bold dark:group-hover:text-gray-400 dark:text-gray-200 text-3xl text-[#99582a]">
                        {name}
                    </h3>
                    <p className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                        {comment}
                    </p>
                    <p className='my-3'><Rating style={{ maxWidth: 100 }} readOnly halfFillMode='svg' value={user_rating} /></p>
                </div>

            </div>
            <div className="divider divider-success my-2"><SiFoodpanda className='text-4xl'></SiFoodpanda></div>
        </div>
    );
};
ReviewsCard.propTypes = {
    review: PropTypes.object,
}

export default ReviewsCard;