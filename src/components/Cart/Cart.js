import React, {useEffect} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { withAlert } from "react-alert";

import classes from './Cart.css';
import Image from "../../UI/Image/Image";
import Button from '../../UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router";

const FieldRow = ({
  item,
  section,
  outerIndex,
  index,
  register,
  control,
  remove,
  errors,
  props
}) => {
  return (
    <div className={classes.Row}>
      <div className={classes.Label} style={{width: '30%'}}>{item.artist.name} : <b>{item.name}</b></div>   
      <div className={classes.Label} style={{width: '10%'}}>{item.price} €</div>   
      <div className={classes.Label} style={{width: '30%'}}><Image src={item.image} width='75'/></div>  
      <div className={classes.Label} style={{width: '10%'}}>        
         <input name={`order.${section}[${index}].cartUnits`}
         defaultValue={item.cartUnits}
         className={classes.InputElement} 
         {...register(`order.${section}[${index}].cartUnits` , { min: 0, max: 10 })} />
         <input name={`order.${section}[${index}].id`}
         defaultValue={item.id}
         type='hidden'
         {...register(`order.${section}[${index}].id`, { required: true })} />         
       </div>
       <div className={classes.Label} style={{width: '10%'}}>
         <a onClick={() => {
           remove(index);
           props.onRemoveCart(item);
          }} 
          style={{cursor: 'pointer'}}>
           <FaTrash style={{color: 'red', fontSize: '1.5em'}} />
          </a>
      </div>
      <div style={{width: '95%', textAlign: 'right', color: 'red'}}>
      {errors && errors.order && errors.order.orderLines[index] && <span>Units must be between 0 - 10</span>}
      </div>      
    </div>
  );
};

const FormSection = ({ control, outerIndex, register, section, errors, props }) => {
  const { fields, remove } = useFieldArray({
    control,
    name: `order.${section}`
  });
  return (
    <div>
      {fields.map((item, index) => {
        return (
          <FieldRow
            key={item.id}
            item={item}
            section={section}
            outerIndex={outerIndex}
            index={index}
            register={register}
            control={control}
            remove={remove}
            errors={errors}
            props={props}
          />
        );
      })}
    </div>
  );
};

const Cart = props => {

  const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
    order: {
      orderLines: [...props.cart]
    }
  }});

  const onSubmit = data => {
    const order = {user: props.user, ordersLines: []};
    data.order.orderLines.forEach(line => {
      if (line.cartUnits !== '' && Number(line.cartUnits) > 0) {
        order.ordersLines.push({
          record: {
            id: line.id
          },
          units: Number(line.cartUnits)
        });  
      }
    });
    if (order.ordersLines.length > 0) {
      props.onSaveOrder(order, props.user, props.access_token);
    }
  };
  let cartRedirect = null;
  let form = null;
  if (props.loading) {
    form = <Spinner/>;
  }  
  else if (props.saved) {
    props.alert.success('Cart order sent successfully');
    cartRedirect = <Redirect to="/home"/>
    props.onEmptyCart();
    props.onInitOrders();  
  }
  else {
    form = (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Center}>
        <FormSection
          control={control}
          register={register}
          section={'orderLines'}
          errors={errors}
          props={props}
        />
        <div className={classes.CenterButton}>
          <Button>Checkout</Button>
        </div>      
      </form>    
    );  
  }
  return (
  <div>
    {cartRedirect}
    {form}
  </div>
  );
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        user: state.auth.user,
        access_token: state.auth.access_token,
        loading: state.order.loading,
        saved: state.order.saved
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveOrder: (order, user, token) => dispatch(actions.saveOrder(order, user, token)),
    onRemoveCart: item => dispatch(actions.removeCart(item)),
    onEmptyCart: () => dispatch(actions.emptyCart()),
    onInitOrders: () => dispatch(actions.initOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Cart));