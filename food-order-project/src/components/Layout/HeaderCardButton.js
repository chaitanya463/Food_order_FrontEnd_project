import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCardButton.module.css';
import CardContext from '../../store/cart-context';

const HeaderCardButton = (props) => {

    const cartContext = useContext(CardContext);

    const numberOfCartItems = cartContext.items.reduce((currNum, item) => 
    {
        return currNum + item.amount;
    }, 0);

    const onClickHandler = () => {
        console.log('inside the HeaderCardButton');
        props.onCartClick();
    }
    return (
        <button className={styles.button} onClick={onClickHandler}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span >
        </button>
    );
}

export default HeaderCardButton;