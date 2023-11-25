import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { createUser, logOut, updateUserProfile } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data.photo[0])
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('Registration Successfully')
            updateUserProfile(data.name, res.data.data.display_url)
            .then(() => {
                toast.success('User Created Successfully')
                const newUser = {
                    name: data.name,
                    email: data.email,
                    image: res.data.data.display_url,
                    badge: 'Bronze'
                }
                axiosPublic.post("/users", newUser)
                .then(res => {
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                })
                logOut()
                .then(() => {
                    console.log('Log Out successfully')
                    navigate("/login")
                })
                .catch(error => {
                    console.error(error);
                })
            })
        })
        .catch(error => {
            console.log(error);
            toast.error(`${error}`)
        })
        // console.log(res.data);

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered" required />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file" name="photo" {...register("photo")} className="file-input file-input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                        <p className="text-[#737373] text-center mt-2 text-lg">Already have an account?  <Link to="/login"><span className="text-[#00bf58] font-bold text-lg">Sign In</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;