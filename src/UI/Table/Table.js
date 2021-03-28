import React from 'react';
import {FaTrash, FaEdit} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import classes from './Table.css';

const table = (props) => {
    const header = (
        <thead>
            <tr>
                {Object.values(props.header).map(value => <th key={value}>{value}</th>)}
                {props.actions ? <th colSpan="2" style={{textAlign: 'center'}}>Actions</th> : null}                
            </tr>
        </thead>
        
    );
    const actions = (
        <td colSpan="2" style={{textAlign: 'center'}}>
            <Link to='/artists/:id'><FaEdit/></Link>
            <Link><FaTrash/></Link>
        </td>
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
                        <Link to={'/artists/' + value.id}><FaEdit/></Link>
                        <Link to={'/artists/delete/' + value.id}><FaTrash/></Link>
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