import React from 'react';
import Adminservicelist from '../Adminservicelist/Adminservicelist';
import Customerservicelist from '../Customerservicelist/Customerservicelist';

const Servicelist = () => {
    return (
        <div>
            {/* <Adminservicelist/> */}
            <Customerservicelist/>
        </div>
    );
};

export default Servicelist;