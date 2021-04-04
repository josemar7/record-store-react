import React from 'react';
import Button from '../Button/Button';
import './DialogConfirm.css';

const dialogConfirm = props => {

    return (
        <div>
            <p>{props.message}</p>
            <div>
                <Button clicked={props.onClickYes}>Yes</Button>
                <Button clicked={props.onClickNo}>No</Button>
            </div>
        </div>
    );
}

export default dialogConfirm;