
import { PropTypes } from 'prop-types';
import priceTag from "../../../../../public/images/vecteezy_red-banner-clipart-design-illustration_9342624.png"
import { Rating } from '@smastrom/react-rating'
import { Link } from 'react-router-dom';



const MealsCard = ({ meal }) => {
    const { mealTitle, mealImage, price, rating, mealType, _id } = meal
    // console.log(mealImage);
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
                <p className='my-3'><Rating style={{ maxWidth: 130 }} readOnly halfFillMode='svg' value={rating} /></p>

                <Link to={`/meal/${_id}`}>
                    <button
                        className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#99582a] text-white hover:bg-[#f8ac55] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        Meal Details
                    </button>
                </Link>
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
MealsCard.propTypes = {
    meal: PropTypes.node,
}

export default MealsCard;