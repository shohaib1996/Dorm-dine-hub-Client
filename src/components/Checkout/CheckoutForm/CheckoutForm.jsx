import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";


const CheckoutForm = ({ price, package_name }) => {
    const axiosPublic = useAxiosPublic()
    // console.log(price);
    const { user } = useAuth()
    const [singleUser] = useUser()
    const objUser = {...singleUser[0]}
    const {_id} = objUser
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("")
    useEffect(() => {
        if (price > 0) {
            axiosPublic.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic, price])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod)
            setError('')
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id)
                const userBadge = {
                    badge: package_name
                }
                axiosPublic.put(`/users/${_id}`, userBadge)
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for the purchase",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                })

            }
            
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="max-w-sm mx-auto">
                <button className="btn w-full  btn-primary mt-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className="mt-12 text-center text-3xl text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};
CheckoutForm.propTypes = {
    price: PropTypes.number,
    package_name: PropTypes.string
}

export default CheckoutForm;