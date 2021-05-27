import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const [isCheckOut, setCheckout] = useState(false);

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
            

    
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span> {totalAmount}</span>
            </div>
            { isCheckOut && <Checkout onCancel= {props.onClose}/>}
            {!isCheckOut && modalAction}
            
        </Modal>
    );
};

export default Cart;