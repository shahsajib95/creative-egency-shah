import React, { useEffect, useState } from 'react';
import './Review.css'
const Reviews = () => {
    const [allreviews, setAllReviews] = useState([]);
    useEffect(()=>{
        (async ()=>{
            await fetch('http://localhost:5000/allreviews')
                    .then(res=>res.json())
                    .then(data=>{ 
                        console.log(data)
                        setAllReviews(data)
                    }
                    )
        })()
    }, [])
    return (
        <div className="client-section container py-5" id="ourteam">
           <h1 className="text-center">Clients <span className="text-success">Feedback</span></h1>
               <div className="row d-flex d-flex justify-content-around">
                   {allreviews.map(review=>
                    <div key={review._id} className="col-md-4 feedbacks p-3 mt-5 ">
                        <div className="d-flex justify-content-start align-items-center">
                        <img className="circle-image mr-3" src={review.photo} alt="reviewerimage"/>
                        <div>
                        <h4>{review.name}</h4>
                        <h6>{review.company}</h6>
                        </div>
                        </div>
                        <p className="text-muted">{review.description}</p>
                   </div>)}
               </div>
        </div>
    );
};

export default Reviews;