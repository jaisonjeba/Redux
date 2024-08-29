import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from './CartContext';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
console.log(items);
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} width="100" />
            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: 
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                {item.quantity}
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </p>
              <p>Total: ${item.price * item.quantity}</p>
              <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h3>Total Quantity: {totalQuantity}</h3>
        <h3>Total Amount: ${totalAmount}</h3>
      </div>
    </div>
  );
};

export default Cart;
