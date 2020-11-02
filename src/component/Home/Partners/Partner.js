import React from 'react';
import './Partner.css'

const Partners = () => {
    const pic = [{name: 'slack'},{name: 'google'},{name: 'uber'},{name: 'netflix'},{name: 'airbnb'}]
    return (
        <div className="d-flex justify-content-around partners p-5 text-center">
            {
                pic.map(image=>
                <div key={image.name}>
                    <img className="partners-logo w-50"  src={require(`../../../images/logos/${image.name}.png`).default} alt=""/>
                 </div>
                )}
        </div>
    );
};

export default Partners;