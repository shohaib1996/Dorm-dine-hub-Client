import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddMeal = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit } = useForm()
    const [submit, setSubmit] = useState(true)
    const onSubmit = async(data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(Object.keys(data).toString());
        // title,price,description,date,rating,email,reviews,name,category,image,likes,ingredients
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
        // console.log(data);
        if (submit) {
            console.log('Adding meal:', mealData);
        } else {
            console.log('Adding to Upcoming');

        }


    }
    return (
        <div>
            <h1 className="text-5xl text-center font-bold my-5">Add A Meal</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal title</span>
                        </label>
                        <input type="text" name="title" {...register('title', { required: true })} placeholder="Meal Title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" {...register('price', { required: true })} name="price" placeholder="Price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" {...register('description', { required: true })} name="description" placeholder="Description" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" {...register('date', { required: true })} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input type="text" {...register('rating', { required: true })} name="rating" placeholder="Rating" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} name="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Likes</span>
                        </label>
                        <input type="text" name="likes" {...register('likes', { required: true })} placeholder="Likes" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Reviews Count</span>
                        </label>
                        <input type="text" placeholder="Reviews" {...register('reviews', { required: true })} name="reviews" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Admin Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} {...register('name', { required: true })} name="name" placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Ingredients(please put comma after each ingredient)</span>
                        </label>
                        <input type="text" {...register('ingredients', { required: true })} name="ingredients" placeholder="please put comma after each ingredient.." className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Choose a Category</span>
                        </label>
                        <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full ">
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
                    <input onClick={() => setSubmit(true)} type="submit" name="addMeal" className="btn btn-secondary" id="" value="Add Meal" />


                    <input onClick={() => setSubmit(false)} type="submit" name="addToUpcoming" className="btn btn-secondary" id="" value="addToUpcoming" />


                </div>
            </form>
        </div>
    );
};

export default AddMeal;