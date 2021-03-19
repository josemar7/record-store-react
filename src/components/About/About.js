import React from 'react';

const about = (props) => {
    console.log(props);
    props.history.push({pathname: '/2'})
    return <div>About!!!</div>;
};

export default about;