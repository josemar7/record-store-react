import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import { connect } from "react-redux";

import * as actions from '../../../store/actions/index';
import Image from "../../../UI/Image/Image";
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './Order.css';

const Order = props => {

  const {onGetOrderById, access_token, loading, id, order} = props;
  const [form, setForm] = useState(null);
  
  useEffect(() => {    
        if (id !== undefined) {
          onGetOrderById(access_token, id);
        }        
  }, [id, onGetOrderById, access_token]);

  useEffect(() => {    
    let myform = null;
    if (loading) {
      myform = <Spinner/>;
    }
    else if (!loading && order) {
      const lines = order.ordersLines.map(line => {
        return (
          <div>
            <div className={classes.Item} style={{width: '300px'}}>{line.record.artist.name} : <b>{line.record.name}</b></div>
            <div className={classes.Item}><Image src={line.record.image} width='55'/></div>
            <div className={classes.Item} style={{textAlign: 'right', width: '50px'}}>{line.units}</div>
          </div>
        );
      });
      myform = (
        <div>
          <h3>Order with ID: <b>{order.id}</b>, Date: <b><Moment date={order.date} format='DD/MM/YYYY hh:mm:ss'/></b> and User: <b>{order.user}</b></h3>
          <div>{lines}</div>
        </div>
      );
    }
    setForm(myform);
  }, [loading, order]);

  return (
    <div>
      {form}
    </div>
  );
}

const mapStateToProps = state => {
    return {
        access_token: state.auth.access_token,
        loading: state.order.loading,
        order: state.order.order
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrderById: (token, id) => dispatch(actions.getOrderById(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);