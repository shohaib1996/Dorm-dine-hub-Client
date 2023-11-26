import { Link, useParams } from "react-router-dom";
import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import useMeals from "../../hooks/useMeals";
import priceTag from "../../../public/images/tag-PNG-Image-300x300-removebg-preview.png"
import { Rating } from "@smastrom/react-rating";
import likeImg1 from "../../../public/images/like_png_2-removebg-preview (1).png"
import likeImg2 from "../../../public/images/like_png-removebg-preview.png"
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import ReviewModal from "./ReviewModal/ReviewModal";
import { useQuery } from "@tanstack/react-query";
import ReviewsCard from "../ReviewsCard/ReviewsCard";



const MealDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [meals, refetch] = useMeals()
    const { id } = useParams()
    const filteredMeal = meals.filter(meal => meal._id == id)
    const mealObject = Object.assign({}, filteredMeal[0]);
    // console.log(Object.keys(mealObject).toString());
    // console.log(filteredMeal);
    // console.log(mealObject);
    const { _id, mealTitle, mealType, ingredients, mealImage, description, price, rating, timeDate, likes, reviews, adminName, admin_Email } = mealObject
    const [like, setLike] = useState(false)
    useEffect(() => {
        setLike(mealObject.liked)
    }, [mealObject.liked])
    // console.log(like);
    let globalYear = "";
    let globalMonth = "";
    let globalDay = "";
    const [singleUser] = useUser()
    const objUser = { ...singleUser[0] }
    const { badge } = objUser
    // console.log(badge);
    const {data: reviewsById=[], refetch: reload} = useQuery({
        queryKey: ['reviews', _id],
        queryFn: async() => {
            const res = await axiosPublic.get(`/reviews?id=${_id}`)
            const data = await res.data
            return data
        }
    })
    console.log(reviewsById);



    if (timeDate) {
        const [year, month, date] = timeDate.split('-');
        const day = date.split('T')[0];
        globalYear = year;
        globalMonth = month;
        globalDay = day;
        // console.log(globalYear, globalMonth, globalDay);
    }
    // console.log(globalYear, globalMonth, globalDay);
    const convertedDate = `${globalYear}/${globalMonth}/${globalDay}`
    const handleLike = () => {
        if (!user) {
            toast.error('Please Login first to like')
        } else {
            axiosPublic.put(`/meals/${_id}`, { liked: true, likes: likes + 1 })
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
    const handleUnLike = () => {
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
                axiosPublic.put(`/meals/${_id}`, { liked: false, likes: likes - 1 })
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
    const handleRequest = () => {
        const newRequestMeal = {
            mealTitle, mealType, ingredients, mealImage, description, price, rating, timeDate, likes, reviews, adminName, admin_Email, user_email: user?.email, status: 'pending'
        }
        if (!user) {
            toast.error("Please Log in first to make a request!!")
        }
        if (badge === 'Bronze') {
            toast.error("Please buy a membership")
        } else {
            axiosPublic.post("/request-meals", newRequestMeal)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        toast.success('Meal request Done')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }



    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="mb-12">
                    <div className="flex justify-between mt-8 p-5">
                        <h1 className="text-4xl font-bold">Meal Detail</h1>
                        <Link to="/meals">
                            <button className="bg-[#b88f3f] px-3 py-2 rounded-2xl text-white font-bold border-[5px] border-[#d0c2a6] hover:border-[#aacc00] hover:bg-[#55421d]">See All</button>
                        </Link>
                    </div>
                    <div className="max-w-5xl mx-auto flex justify-center gap-5">
                        <div className="flex-[2] relative">
                            <img className="w-[450px] border-4 border-[#c2b59d] p-2  h-[460px] object-cover" src={mealImage} alt="" />
                            <img className="w-32 h-28 absolute -top-1 -left-0" src={priceTag} alt="" />
                            <p className="text-xl font-bold text-white absolute top-8 left-8">${price}</p>
                            <div className="flex justify-between mt-4">
                                <p className='my-3 flex items-center gap-5'><Rating style={{ maxWidth: 180 }} readOnly halfFillMode='svg' value={rating} /> <span>({reviews})</span></p>
                                <div className="flex items-center">
                                    {
                                        like && user ? <img onClick={handleUnLike} className="w-20 h-12 btn hover:bg-transparent border-none bg-transparent" src={likeImg2} alt="" /> : <img onClick={handleLike} className="w-20 h-12 btn hover:bg-transparent border-none bg-transparent" src={likeImg1} alt="" />

                                    }
                                    <p className="mt-2">({likes})</p>
                                </div>

                            </div>
                        </div>
                        <div className="flex-[3]">
                            <div className="relative">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/021/447/146/small/sticker-home-garden-plan-tree-label-name-tag-png.png" alt="" />
                                <p className="text-white font-bold text-3xl absolute top-10 left-32">{mealTitle}</p>
                                <p className="absolute right-0"><span>Posted by-----</span><span className="text-2xl text-[#a1bd57] font-bold">({adminName})</span></p>
                                <p className=" text-right right-0 mt-10"><span>Posted date-----</span><span className="text-2xl text-[#a1bd57] font-bold">({convertedDate})</span></p>
                                <div className="divider divider-start mt-5 ml-5 font-bold text-xl text-[#a1bd57]">Description</div>
                                <p className="mt-4 ml-16 italic">{description}</p>
                                <div className="divider divider-start mt-5 ml-5 font-bold text-xl text-[#a1bd57]">Ingredients</div>
                                <p className="mt-4 ml-16 italic flex flex-wrap gap-3">
                                    {
                                        ingredients?.map((ingredient, i) =>
                                            <li className="list-disc" key={i}>{ingredient}</li>
                                        )
                                    }
                                </p>

                            </div>
                            <div className="w-full p-5 ml-5 my-5">
                                <button onClick={handleRequest} className="btn btn-primary bg-[#b88f3f] hover:bg-[#55421d] font-bold text-white border-none  w-full">Make Meal Request</button>
                            </div>
                        </div>


                    </div>
                    <div className="divider"><img className='animate-spin my-12' src="https://wedesignthemes.com/html/bella/skins/palebrown/images/driver-two.png" alt="" /></div>
                    <div className="flex justify-center flex-col relative">
                        <img className="mt-12 w-[800px] mx-auto" src="https://static.vecteezy.com/system/resources/thumbnails/022/324/115/small/gold-ribbon-banner-free-png.png" alt="" />
                        <p className="text-center text-4xl font-bold text-[#283618] absolute top-20 left-[512px]">Add a review !!</p>
                        <button onClick={()=> setShowModal(true)} className="btn w-96 h-48 border-4 border-slate-600 bg-transparent hover:bg-transparent hover:border-green-500 mx-auto text-3xl">Add a review</button>
                    </div>
                    <ReviewModal refetch={refetch} reload={reload} showModal={showModal} setShowModal={setShowModal} meal={mealObject}></ReviewModal>

                </div>
                <div className="max-w-sm mx-auto my-12">
                    {
                        reviewsById?.data?.map(review => <ReviewsCard key={review._id} review={review}></ReviewsCard>)
                    }
                </div>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default MealDetails;