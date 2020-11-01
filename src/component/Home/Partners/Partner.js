import React from 'react';
import './Partner.css'

const Partners = () => {
    const pic = [{name: 'slack'},{name: 'google'},{name: 'uber'},{name: 'netflix'},{name: 'airbnb'}]
    return (
        <div className="row p-5">
            {
                pic.map(image=>
                <div className="col-md-1 offset-md-1" key={image.name}>
                    <img className="partners-logo"  src={require(`../../../images/logos/${image.name}.png`).default} alt=""/>
                 </div>
                )}
        </div>
    );
};

export default Partners;