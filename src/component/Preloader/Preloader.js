import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const Preloader = () => {
    return (
        <div style={{width: '100vh', margin: '20vh'}}>
            <LinearProgress />
        </div>
    );
};

export default Preloader;