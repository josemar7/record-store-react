import React from 'react';

import classes from './Table.css';

const table = (props) => {
    const header = (
        <thead>
            <tr>
                {Object.values(props.header).map(value => <th key={value}>{value}</th>)}
            </tr>
        </thead>
        
    );
    const data = (
        <tbody>
        {
            props.data.map(value => {
            return (
                <tr key={value.id}>
                    {Object.keys(value).map(k => <td key={value[k]}>{value[k]}</td>)}
                </tr>
            );})
        }
        </tbody>);
    return (
        <div style={{paddingTop: "10px"}}>
            <table className={classes.Table}>
                {header}
                {data}
            </table>
        </div>
        
    );
};

export default table;