import { useLocation } from "react-router-dom";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Footer from "../../SharedFile/Footer/Footer";
import Container from "../../Utils/Container/Container";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const silverObj = {
    name: "Silver",
    price: 100,
    benefits: [
        "Moderate discount on monthly meal plans",
        "Access to a basic collection of recipes",
        "Weekly newsletter with meal ideas",
        "Valid for 12 months"
    ]
}
const goldObj = {
    name: "Gold",
    price: 150,
    benefits: [
        "Higher discount on monthly meal plans",
        "Access to an expanded collection of premium recipes",
        "Exclusive access to virtual or in-person cooking classes",
        "Valid for 12 months"
    ]
}
const platinumObj = {
    name: "Platinum",
    price: 200,
    benefits: [
        "Highest discounts on all food-related services",
        "Special evening with a private chef",
        "Personalized meal plans to dietary preferences",
        "Valid for 12 months"
    ]
}
const Checkout = () => {
    const [obj, setObj] = useState([])
    const location = useLocation()
    const package_name = location.pathname.split("/")[2]
    useEffect(() => {
        if (package_name === 'Silver') {
            setObj(silverObj);
        } else if (package_name === 'Gold') {
            setObj(goldObj)
        } else if (package_name === 'Platinum') {
            setObj(platinumObj)
        }
    }, [package_name]);
    console.log(obj);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <h1 className="mt-20 text-center text-4xl font-bold uppercase">Payment</h1>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>

                    </Elements>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;