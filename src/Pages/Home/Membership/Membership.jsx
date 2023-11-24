import ribbon from "../../../../public/images/big-ribbon.png"
import silver from "../../../../public/images/silver_badge-removebg-preview.png"
import gold from "../../../../public/images/gold_bage-removebg-preview.png"
import platinum from "../../../../public/images/platinum_badge-removebg-preview.png"

const Membership = () => {
    const silver_price = 100
    const gold_price = 150
    const platinum_price = 200
    return (
        <div>
            <div className='mt-16 max-w-4xl mx-auto relative flex flex-col justify-center items-center'>
                <img src={ribbon} alt="" />
                <p className='text-2xl font-bold text-white absolute top-3 left-[290px]'>Our Membership Programme</p>
                <p className='max-w-xl text-xs absolute top-12 text-white font-bold text-center left-[160px]'>A membership program typically offers various tiers or levels with increasing benefits as members progress from one tier to another. Here&apos;s an example breakdown for a membership program with silver, gold, and platinum tiers</p>
            </div>
            <div className="flex justify-center items-center gap-7 mt-8 mb-14">
                <div className="relative w-[300px]">
                    <div>
                        <img src="https://wedesignthemes.com/html/bella/skins/palebrown/images/pr-brown.png" alt="" />
                        <p className="absolute top-10 left-24 text-white text-5xl font-bold">$<span>{silver_price}</span> <br /> <span className="text-lg absolute left-8">/month</span></p>
                    </div>
                    <div className="border-2 p-3 rounded-b-xl">
                        <div className="flex items-center justify-evenly">
                            <h1 className="text-center pt-1">Benefits</h1>
                            <img className="w-12 h-12" src={silver} alt="" />
                        </div>
                        <div className="divider my-1"></div>
                        <p className="text-center">Silver members receive a moderate discount on monthly meal plans</p>
                        <div className="divider my-1"></div>
                        <p className="text-center">Gain access to a basic collection of recipes </p>
                        <div className="divider my-1"></div>
                        <p className="text-center">Receive a weekly newsletter with meal ideas, </p>
                        <div className="divider my-1"></div>
                        <p className="text-center">Valid for 12 Months </p>
                        <div className="divider my-1"></div>
                        <div className="flex items-center justify-center pb-3">
                            <button className="bg-[#b88f3f] px-3 py-2 rounded-2xl text-white font-bold border-[5px] border-[#d0c2a6] hover:border-[#aacc00] hover:bg-[#55421d]">Buy Now</button>
                        </div>


                    </div>

                </div>
                <div>
                    <div className="relative  w-[300px]">
                        <div>
                            <img src="https://wedesignthemes.com/html/bella/skins/palebrown/images/pr-green.png" alt="" />
                            <p className="absolute top-10 left-24 text-white text-5xl font-bold">$<span>{gold_price}</span> <br /> <span className="text-lg absolute left-8">/month</span></p>
                        </div>
                        <div className="border-2 p-3 rounded-b-xl">
                            <div className="flex items-center justify-evenly">
                                <h1 className="text-center pt-1">Benefits</h1>
                                <img className="w-12 h-12" src={gold} alt="" />
                            </div>
                            <div className="divider my-1"></div>
                            <p className="text-center">Gold members enjoy a higher discount on monthly meal plans</p>
                            <div className="divider my-1"></div>
                            <p className="text-center">Access to an expanded collection of premium recipes </p>
                            <div className="divider my-1"></div>
                            <p className="text-center">Exclusive access to virtual or in-person cooking classes </p>
                            <div className="divider my-1"></div>
                            <p className="text-center">Valid for 12 Months </p>
                            <div className="divider my-1"></div>
                            <div className="flex items-center justify-center pb-3">
                                <button className="bg-[#b88f3f] px-3 py-2 rounded-2xl text-white font-bold border-[5px] border-[#d0c2a6] hover:border-[#aacc00] hover:bg-[#55421d]">Buy Now</button>
                            </div>


                        </div>
                    </div>



                </div>
                <div>
                    <div className="relative w-[300px]">
                        <div>
                            <img src="https://wedesignthemes.com/html/bella/skins/palebrown/images/pr-brown.png" alt="" />
                            <p className="absolute top-10 left-24 text-white text-5xl font-bold">$<span>{platinum_price}</span> <br /> <span className="text-lg absolute left-8">/month</span></p>
                        </div>
                        <div className="border-2 p-3 rounded-b-xl">
                            <div className="flex items-center justify-evenly">
                                <h1 className="text-center pt-1">Benefits</h1>
                                <img className="w-12 h-12" src={platinum} alt="" />
                            </div>
                            <div className="divider my-1"></div>
                            <p className="text-center">Enjoy the highest discounts on all food-related services</p>
                            <div className="divider my-1"></div>
                            <p className="text-center">A special evening with a private chef who prepares food </p>
                            <div className="divider my-1"></div>
                            <p className="text-center">Receive personalized meal plans to the member&apos;s dietary preferences </p>
                            <div className="divider my-1"></div>
                            <p className="text-center">Valid for 12 Months </p>
                            <div className="divider my-1"></div>
                            <div className="flex items-center justify-center pb-3">
                                <button className="bg-[#b88f3f] px-3 py-2 rounded-2xl text-white font-bold border-[5px] border-[#d0c2a6] hover:border-[#aacc00] hover:bg-[#55421d]">Buy Now</button>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Membership;