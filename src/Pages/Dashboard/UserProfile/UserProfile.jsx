import useUser from "../../../hooks/useUser";
import ribbonImg from "../../../../public/images/big-ribbon.png"


const UserProfile = () => {
    const [singleUser] = useUser()
    // console.log(singleUser);
    const objUser = {...singleUser[0]}
    const {badge,image, badge_image, name, email} = objUser
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
        </div>
    );
};

export default UserProfile;