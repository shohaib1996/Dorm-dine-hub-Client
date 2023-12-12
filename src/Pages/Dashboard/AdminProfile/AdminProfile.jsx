import { useQuery } from "@tanstack/react-query";
import ribbonImg from "../../../../public/images/big-ribbon.png"
import useAuth from "../../../hooks/useAuth";

import useUser from "../../../hooks/useUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const AdminProfile = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();

    const { data: number = [] } = useQuery({
        queryKey: ["number", user?.email],  
        queryFn: async () => {
            if (user) {
                const res = await axiosPublic.get(`/meals?admin=${user?.email}`);
                const data = await res.data;
                return data;
            }
            return [];
        },
    });
    const { data: upcomingNumber = [] } = useQuery({
        queryKey: ["upcomingNumber", user?.email],  
        queryFn: async () => {
            if (user) {
                const res = await axiosPublic.get(`/upcoming-meals?admin=${user?.email}`);
                const data = await res.data;
                return data;
            }
            return [];
        },
    });
    
    
    console.log(number);
    

    const [singleUser, , isLoading] = useUser()
    // console.log(singleUser);
    if (isLoading) {
        return <p>Loading</p>
    }
    const objUser = { ...singleUser.data[0] }
    console.log(objUser);
    const { badge, image, badge_image, name, email, role } = objUser
    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-2xl lg:text-3xl font-bold  text-center absolute top-10 lg:top-14 text-white left-[120px] lg:left-[240px]">Admin profile</p>
            </div>
            <p className="text-center font-bold text-3xl">Number of Meals you added: {number.length}</p>
            <p className="text-center font-bold text-xl">Number of Upcoming Meals you added: {upcomingNumber.length}</p>
            <p className="text-center text-xl font-bold my-2 uppercase">Role: {role}</p>
            <div>

                <div className="p-10 flex justify-center flex-col lg:flex-row">
                    <div className="flex-1 flex flex-col justify-center relative ">
                        <img className="w-[250px] h-[300px] border-4 p-3 object-cover " src={image} alt="" />
                        <img className="w-20 h-20 absolute bottom-2 left-[165px] animate-bounce" src={badge_image} alt="" />
                    </div>
                    <div className="flex-1 text-center space-y-8 rounded-xl p-8">
                        <h1 className="border p-2 rounded-lg bg-slate-300"><span className="text-xl font-bold mr-5">Name: </span><span className="uppercase italic">{name}</span></h1>
                        <h1 className="border p-2 rounded-lg bg-slate-300"><span className="text-xl font-bold mr-5">Email:</span> <span className=" italic">{email}</span></h1>
                        <h1 className="border p-2 rounded-lg bg-slate-300"><span className="text-xl font-bold mr-5">Membership: </span> <span className="uppercase italic">{badge}</span></h1>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;