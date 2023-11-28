import ribbonImg from "../../../../public/images/big-ribbon.png"
const AdminProfile = () => {
    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[240px]">Admin profile</p>
            </div>
            <h1>This is Admin profile</h1>
        </div>
    );
};

export default AdminProfile;