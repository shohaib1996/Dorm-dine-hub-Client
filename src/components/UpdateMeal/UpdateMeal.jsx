import { useParams } from "react-router-dom";
import ribbonImg from "../../../public/images/big-ribbon.png"
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useMeals from "../../hooks/useMeals";
import toast from "react-hot-toast";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateMeal = () => {
    const { id } = useParams()
    // console.log(id);
    const [meals, refetch , isLoading] = useMeals()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit } = useForm()
  
    if (isLoading) {
        return <p>loading...</p>
    }
    const updatedMeal = meals.find(meal => meal._id === id)
    // console.log(updatedMeal);
    const { _id, mealTitle, mealType, ingredients, description, price, rating, timeDate, likes, reviews, adminName, admin_Email } = updatedMeal
    console.log(timeDate);
    const formattedDate = new Date(timeDate).toISOString().split('T')[0];
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        const mealTitle = data.title
        const price = parseFloat(data.price)
        const description = data.description
        const timeDate = data.date
        const rating = parseFloat(data.rating)
        const admin_Email = data.email
        const reviews = parseFloat(data.reviews)
        const adminName = data.name
        const mealType = data.category
        const mealImage = res.data.data.display_url
        const likes = parseFloat(data.likes)
        const ingredients = (data.ingredients).split(",")
        const mealData = {
            mealTitle, price, description, timeDate, rating, reviews, admin_Email, adminName, mealType, mealImage, likes, ingredients
        }
        axiosPublic.put(`/meals/${_id}`, mealData)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success("Meal updated successfully!!")

            }
        })
    }
    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[250px]">Update Meal</p>
            </div>
            <div className="p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal title</span>
                            </label>
                            <input type="text" defaultValue={mealTitle} name="title" {...register('title', { required: true })} placeholder="Meal Title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" defaultValue={price} {...register('price', { required: true })} name="price" placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" defaultValue={description} {...register('description', { required: true })} name="description" placeholder="Description" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" defaultValue={formattedDate} name="date" {...register('date', { required: true })} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="text" defaultValue={rating} {...register('rating', { required: true })} name="rating" placeholder="Rating" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" defaultValue={admin_Email} name="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Likes</span>
                            </label>
                            <input type="text" name="likes" defaultValue={likes} {...register('likes', { required: true })} placeholder="Likes" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reviews Count</span>
                            </label>
                            <input type="text" defaultValue={reviews} placeholder="Reviews" {...register('reviews', { required: true })} name="reviews" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Admin Name</span>
                            </label>
                            <input type="text" defaultValue={adminName} {...register('name', { required: true })} name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Ingredients(please put comma after each ingredient)*</span>
                            </label>
                            <input type="text" defaultValue={ingredients.join(",")}  {...register('ingredients', { required: true })} name="ingredients" placeholder="please put comma after each ingredient.." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Choose a Category</span>
                            </label>
                            <select defaultValue={mealType} {...register('category', { required: true })} className="select select-bordered w-full ">
                                <option value="default" disabled selected>Category</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload a Image</span>
                            </label>
                            <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full" />
                        </div>
                        <input type="submit" name="addMeal" className="btn btn-secondary" id="" value="Update Meal" />


                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;