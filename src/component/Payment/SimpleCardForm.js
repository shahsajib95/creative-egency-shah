import React, { useContext, useState } from 'react';
import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { PurchaseContext, UserContext } from '../../App';
import { CircularProgress } from '@material-ui/core';


const SimpleCardForm = ({orderInfo}) => {
  const [purchaseService, setPurchaseService] = useContext(PurchaseContext)
  const [loggedIn, setLoggedIn] = useContext(UserContext)

  const [success, setSuccess] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [payError, setPayError] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setPreloader(true)
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
    });
    console.log(error, paymentMethod)
    if(error){
      setSuccess()
    }
    if(paymentMethod){
      setPayError()
      const allInfo = { 
    status: 'pending', 
    title: purchaseService.title, 
    description: purchaseService.description, 
    photo: purchaseService.image ? purchaseService.image : null, 
    ...orderInfo, 
    email: loggedIn.email,
    payId: paymentMethod.id,
    payDate: new Date()  };
      console.log(allInfo)
     fetch('http://localhost:5000/placedOrders', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(result => {
                setSuccess(result) 
                window.location.reload()
                setPreloader(false)

            })
    }
  };

  return (
    
    <>
       {preloader && <div className="alert alert-warning mt-2" role="alert">
               <CircularProgress />
                Checking Payment Info
               </div>}
      
        {payError &&
        <div className="alert alert-danger" role="alert">
        {payError}
        </div>}
        {success &&
        <div className="alert alert-success" role="alert">
          Order Placed Successfully
        </div>}
        
        
      <form onSubmit={handleSubmit} className='bg-white p-4 m-4'> 
      <div className="form-group">
        <label for="inputAddress2">Card Number</label>
        <CardNumberElement className="form-control"/>
      </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Expiry Date</label>
            <CardExpiryElement  className="form-control"/>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">CVC</label>
            <CardCvcElement  className="form-control"/>
          </div>
        </div>
        <button className="btn main-btn" type="submit" disabled={!stripe}>
          Pay
      </button>
    </form>
    </>
  );
};

export default SimpleCardForm;