// eslint-disable-next-line react/prop-types
const UserModal = ({ showModal, setShowModal }) => {
    return (
        <>
            {
                showModal && <dialog id="my_modal_3" className="modal" open>
                    <div className="modal-box">
                        <form method="dialog">
                            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white font-bold border-none">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Please Input about your self</h3>
                        <div>
                            <form className="card-body grid grid-cols-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Hobby</span>
                                    </label>
                                    <input type="text" placeholder="hobby" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Pet Name</span>
                                    </label>
                                    <input type="text" placeholder="Pet Name" className="input input-bordered" required />
                                    
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" placeholder="Address" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Education</span>
                                    </label>
                                    <input type="text" placeholder="Education" className="input input-bordered" required />
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
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