import useUser from "../../../hooks/useUser";
import ribbonImg from "../../../../public/images/big-ribbon.png"
import { useState } from "react";
import UserModal from "./UserModal/UserModal";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const UserProfile = () => {
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [userInfo, setUserInfo] = useState({})
    const { data: aboutInfo, isLoading: loading, refetch } = useQuery({
        queryKey: ["aboutInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/about?email=${user?.email}`)
            const data = await res.data
            return data
        }

    })
    const [singleUser, , isLoading] = useUser()

    const [showModal, setShowModal] = useState(false)
    // console.log(singleUser);
    if (isLoading) {
        return <p>Loading</p>
    }
    const objUser = { ...singleUser.data[0] }
    console.log(objUser);
    const { badge, image, badge_image, name, email } = objUser

    console.log(aboutInfo);
    const objInfo = { ...aboutInfo[0] }
    if (loading) {
        return <p>Loading..</p>
    }
    const handleUpdateModal = user => {
        setShowModal(true)
        console.log(user);
        setUserInfo(user)

    }
    console.log(userInfo);

    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-16 text-white left-[260px]">My Profile</p>
            </div>
            <div className="p-10 flex justify-center">
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
            <div>
                <h1 className="text-3xl font-bold text-center my-5">----About Me----</h1>
                <div className="my-12">
                    <div className="flex items-center justify-center gap-12">
                        <p>Hobby: {objInfo.hobby}</p>
                        <p>Pet-name: {objInfo.pet}</p>
                    </div>
                    <div className="flex items-center justify-center gap-12">
                        <p>Address: {objInfo.address}</p>
                        <p>Education: {objInfo.education}</p>

                    </div>
                    <div className="flex justify-center my-5">
                        {
                            objInfo.post == 'success' ? <button onClick={() => handleUpdateModal(objInfo)} className="btn btn-accent">Update</button> : <button onClick={() => setShowModal(true)} className="btn btn-accent">Edit</button>
                        }
                    </div>
                </div>

            </div>
            <UserModal refetch={refetch} userInfo={userInfo} showModal={showModal} setShowModal={setShowModal}></UserModal>
        </div>
    );
};

export default UserProfile;