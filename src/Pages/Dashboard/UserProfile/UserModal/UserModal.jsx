/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";


const UserModal = ({ showModal, setShowModal, userInfo, refetch}) => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        if(userInfo && userInfo.post == 'success'){
            setSubmit(true)
        }
    },[userInfo])
    const handleSubmit = e => {
        if (!submit) {
            e.preventDefault()
            const form = e.target
            const hobby = form.hobby.value
            const pet = form.pet.value
            const address = form.address.value
            const education = form.education.value

            const aboutUser = {
                hobby, pet, address, education, post: 'success', email: user?.email
            }
            axiosPublic.post(`/about`, aboutUser)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        refetch()
                        toast.success('Thanks for your information')
                    }
                })
            setShowModal(false)

        }
        else {
            e.preventDefault()
            const form = e.target
            const hobby = form.hobby.value
            const pet = form.pet.value
            const address = form.address.value
            const education = form.education.value
            const aboutUser = {
                hobby, pet, address, education, post: 'success', email: user?.email
            }
            axiosPublic.put(`/about/${userInfo._id}`, aboutUser)
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        toast.success('updated Your information')
                    }
                })
            setShowModal(false)
        }
        

    }
    return (
        <>
            {
                showModal && <dialog id="my_modal_3" className="modal" open>
                    <div className="modal-box">
                        <form method="dialog" >
                            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white font-bold border-none">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Please Input about your self</h3>
                        <div>
                            <form onSubmit={handleSubmit} className="card-body grid grid-cols-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Hobby</span>
                                    </label>
                                    <input type="text" defaultValue={userInfo.hobby} name="hobby" placeholder="hobby" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Pet Name</span>
                                    </label>
                                    <input type="text" name="pet" defaultValue={userInfo.pet} placeholder="Pet Name" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" defaultValue={userInfo.address} name="address" placeholder="Address" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Education</span>
                                    </label>
                                    <input type="text" defaultValue={userInfo.education} name="education" placeholder="Education" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">

                                    {
                                        userInfo.post == 'success' ? <input type="submit" className="btn btn-primary" value="Update Info" /> : <input type="submit" className="btn btn-primary" value="submit" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            }
        </>
    );
};

export default UserModal;