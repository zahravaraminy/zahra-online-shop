import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';

const KEY="pk_test_51PLJEsC9xGH1VIlXjVGhWSuMWQsNneTovQPuljCHJgpiLZ768VihZoq3HF4YoN5lmJNgLQhw8vCtW1fUA8fSoibQ00qqR28WxX";

const Pay=()=>{
    const [stripeToken, setStripeToken]= useState(null);
    const history=useHistory()
const onToken= (token)=>{

setStripeToken(token);
};
useEffect(()=>{
const makeRequest= async ()=>{
try{
const res= await axios.post("http://localhost:5000/api/checkout/payment",
{tokenId:stripeToken.id,
amount:2000,
}
);
console.log(res.date);
history.push("/success");
}catch(err){
console.log(err);
}
};
stripeToken && makeRequest
},[stripeToken,history])
return(
<div
style={{
height: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
}}
>
    {stripeToken ? (<span>Processing. Please wait...</span>): (
    <StripeCheckout name="Lama Shop" image="
https://avatars.githubusercontent.com/u/1486366?v=4"
billingAddress
shippingAddress
description=" Your total is $20"
amount={2000}
token={onToken}
stripeKey={KEY}>

  
<button
style={{
border:"none", 
width: 120,
borderRadius:5,
padding:"20px",
backgroundColor: "black",
color:"white",
fontWeight:"600",
cursor:"pointer"
}}
>
Pay Now
</button>
</StripeCheckout>
)}
</div>
);
};

export default Pay;