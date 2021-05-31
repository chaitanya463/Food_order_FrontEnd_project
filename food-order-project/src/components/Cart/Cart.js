import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import React, {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const [isCheckOut, setCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item, amount: 1});
    }; 

    const orderHandler = () => {
        setCheckout(true);
    };

    const cartItems = (
        <ul className={styles['cart-items']}>{cartContext.items.map((item) => ( 
            <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
            ))}
        </ul>
    ) ;
    const hasItems = cartContext.items.length > 0;

    const totalAmount = ` $ ${cartContext.totalAmount.toFixed(2)}`;

    const modalAction = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={styles.button} onClick = {orderHandler}>Order</button>}
        </div>
    );
            
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-dd09a-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCart();
    }

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span> {totalAmount}</span>
            </div>
            { isCheckOut && <Checkout onCancel= {props.onClose} onConfirmed={submitOrderHandler}/>}
            {!isCheckOut && modalAction}

        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending Order...</p>

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Order placed successfully!.</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
        
    );
    
    return (
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting && isSubmittingModalContent}
           {!isSubmitting && didSubmit && didSubmitModalContent}
            
        </Modal>
    );
};

export default Cart;