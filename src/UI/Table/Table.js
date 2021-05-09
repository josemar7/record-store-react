import React from 'react';
import {FaTrash, FaEdit} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import classes from './Table.css';

const table = (props) => {
    const header = (
        <thead>
            <tr>
                {Object.values(props.header).map(value => <th key={value.label}
                style={{width: value.width}}>{value.label}</th>)}
                {props.actions ? <th colSpan="2" style={{textAlign: 'center'}}>Actions</th> : null}                
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
                    {props.actions ? 
                    <td colSpan="2" style={{textAlign: 'center'}}>
                        <Link to={'/' + props.type + '/' + value.id}><FaEdit/></Link>
                        <Link onClick={() => props.delete(props.token, value.id)}><FaTrash/></Link>
                    </td> : null}
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